import { AnyAction, combineReducers } from 'redux'

import { ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'app/app.reducer'
import { authReducer } from 'features/auth/auth.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { departmentsReducer } from 'features/crm/departments/departments.reducer'
import { tasksReducer } from 'features/todolists-list/tasks/tasks.reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  departments: departmentsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
