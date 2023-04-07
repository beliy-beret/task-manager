import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatusType, appActions } from 'app/appSlice';
import { TodolistType, todolistsAPI } from 'api/todolists-api';

import { AppThunk } from 'app/store';
import { fetchTasksTC } from './tasksSlice';
import { handleServerNetworkError } from 'utils/error-utils';

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        removeTodo: (state, action: PayloadAction<{todoId: string}>) => {
            const indexTodo = state.findIndex(t => t.id === action.payload.todoId)
            if(indexTodo !== -1) {
                state.splice(indexTodo, 1)
            }
        },
        addTodo: (state, action: PayloadAction<{ todo: TodolistType}>) => {
            state.unshift({...action.payload.todo, entityStatus: 'idle', filter: 'active'})
        },
        changeTodoTitle: (state, action: PayloadAction<{todoId: string; title: string}>) => {
            const todo = state.find(t => t.id === action.payload.todoId)
            if(todo){
                todo.title = action.payload.title
            }
        },
        setTodos: (state, action: PayloadAction<TodolistType[]>) => {
            return action.payload.map(t => ({...t, filter: 'active', entityStatus: 'idle'}))
        },
        changeTodoFilter: (state, action: PayloadAction<{todoId: string; filter: FilterValuesType}>) => {
            state.forEach(t => t.id === action.payload.todoId && t.filter === action.payload.filter)
        },
        changeTodoEntityStatus: (state, action: PayloadAction<{todoId: string; status: RequestStatusType}>) => {
            state.forEach(t => t.id === action.payload.todoId && t.entityStatus === action.payload.status)
        },
        clearData: () => {
            return []
        }
    },    
})

export const todoActions = slice.actions;
export const todoReducer = slice.reducer;

//thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {                
                dispatch(todoActions.setTodos(res.data))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return res.data
            })
            .then((todos) => todos.forEach((todo) => dispatch(fetchTasksTC(todo.id))))
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodolistTC = (todoId: string): AppThunk => {
    return (dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todoActions.changeTodoEntityStatus({todoId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todoId)
            .then((res) => {
                dispatch(todoActions.removeTodo({todoId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(todoActions.addTodo({todo: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(todoActions.changeTodoTitle({todoId: id, title}))
            })
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}