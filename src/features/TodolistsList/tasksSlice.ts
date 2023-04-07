import { AppRootStateType, AppThunk } from 'app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, todolistsAPI } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'

import { appActions } from 'app/appSlice'
import {todoActions} from './todoSlice'

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{todoId: string, taskId: string}>) => {
            let taskIndex = state[action.payload.todoId].findIndex(t => t.id === action.payload.taskId)
            state[action.payload.todoId].splice(taskIndex, 1)
            
        },
        addTask: (state, action: PayloadAction<{todoId: string, task: TaskType}>) => {
            state[action.payload.todoId].unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{todoId: string, taskId: string, model: UpdateDomainTaskModelType}>) => {
            let task = state[action.payload.todoId].find(t => t.id === action.payload.taskId)
            if(task){
                task = {...task, ...action.payload.model}
            }
        },
        setTasks: (state, action: PayloadAction<{ todoId: string, taskList: TaskType[] }>) => {
            state[action.payload.todoId] = action.payload.taskList
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(todoActions.addTodo, (state, action) => {
            state[action.payload.todo.id] = []
        })
        .addCase(todoActions.removeTodo, (state, action) => {
            delete state[action.payload.todoId]
        })
        .addCase(todoActions.setTodos, (state, action) => {
            action.payload.forEach(t => state[t.id] = [])
        })
    }    
})

export const tasksActions = slice.actions;
export const tasksReducer = slice.reducer;

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(tasksActions.setTasks({todoId: todolistId, taskList: tasks}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = tasksActions.removeTask({todoId: todolistId, taskId})
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = tasksActions.addTask({todoId: todolistId, task})
                dispatch(action)
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = tasksActions.updateTask({taskId, model: apiModel, todoId: todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
