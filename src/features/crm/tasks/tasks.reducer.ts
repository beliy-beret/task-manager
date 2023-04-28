import {
  AddTaskArgType,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
  tasksApi,
} from './tasks.api'
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums'

import { appActions } from 'app/app.reducer'
import { createAppAsyncThunk } from 'common/utils'
import { createSlice } from '@reduxjs/toolkit'
import { departmentsThunks } from '../departments/departments.reducer'

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[] }, string>(
  'tasks/fetchTasks',
  async (todolistId) => {
    const res = await tasksApi.getTasks(todolistId)
    const tasks = res.data.items
    return { tasks }
  }
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  'tasks/addTask',
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.createTask(arg)
    if (res.data.resultCode === ResultCode.Success) {
      const task = res.data.data.item
      return { task }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  }
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  'tasks/updateTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI

    const state = getState()
    const task = state.tasks.find((t) => t.id === arg.taskId)
    if (!task) {
      dispatch(appActions.setAppError({ error: 'Task not found in the state' }))
      return rejectWithValue(null)
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    }

    const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === ResultCode.Success) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
  'tasks/removeTask',
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.deleteTask(arg)
    if (res.data.resultCode === ResultCode.Success) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)

const initialState: TasksStateType = []

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          state[index] = { ...state[index], ...action.payload.domainModel }
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(
        departmentsThunks.removeDepartment.fulfilled,
        (state, action) => {
          if (state[0].todoListId === action.payload.id) {
            return []
          }
        }
      )
  },
})

export const tasksReducer = slice.reducer
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksStateType = Array<TaskType>
