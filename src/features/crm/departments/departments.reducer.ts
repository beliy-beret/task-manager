import {
  DepartmentType,
  UpdateDepartmentNameArgType,
  departmentsApi,
} from './departments.api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RequestStatusType } from 'app/app.reducer'
import { ResultCode } from 'common/enums'
import { clearTasksAndTodolists } from 'common/actions'
import { createAppAsyncThunk } from 'common/utils'

const fetchDepartments = createAppAsyncThunk<
  { departments: DepartmentType[] },
  void
>('departments/fetchDepartments', async () => {
  const res = await departmentsApi.getDepartments()
  return { departments: res.data }
})

const addDepartment = createAppAsyncThunk<
  { department: DepartmentType },
  string
>('departments/addDepartment', async (name, { rejectWithValue }) => {
  const res = await departmentsApi.createDepartment(name)
  if (res.data.resultCode === ResultCode.Success) {
    return { department: res.data.data.item }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})

const removeDepartment = createAppAsyncThunk<{ id: string }, string>(
  'departments/removeDepartment',
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(
      departmentsActions.changeDepartmentEntityStatus({
        id,
        entityStatus: 'loading',
      })
    )
    const res = await departmentsApi.deleteDepartment(id)
    if (res.data.resultCode === ResultCode.Success) {
      return { id }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)

const changeDepartmentTitle = createAppAsyncThunk<
  UpdateDepartmentNameArgType,
  UpdateDepartmentNameArgType
>('departments/changeDepartmentName', async (arg, { rejectWithValue }) => {
  const res = await departmentsApi.updateDepartment(arg)
  if (res.data.resultCode === ResultCode.Success) {
    return arg
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true })
  }
})

const initialState = {
  departments: [] as DepartmentDomainType[],
  activeDepartmentId: '',
}

const slice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    changeDepartmentEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) => {
      const dept = state.departments.find(
        (dept) => dept.id === action.payload.id
      )
      if (dept) {
        dept.entityStatus = action.payload.entityStatus
      }
    },
    changeActiveDepartmentId: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.activeDepartmentId = action.payload.id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload.departments.map((dept) => ({
          ...dept,
          entityStatus: 'idle',
        }))
        state.activeDepartmentId = action.payload.departments[0].id
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        const newDepartment: DepartmentDomainType = {
          ...action.payload.department,
          entityStatus: 'idle',
        }
        state.departments.unshift(newDepartment)
      })
      .addCase(removeDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        )
        if (index !== -1) state.departments.splice(index, 1)
      })
      .addCase(changeDepartmentTitle.fulfilled, (state, action) => {
        const dept = state.departments.find(
          (dept) => dept.id === action.payload.id
        )
        if (dept) {
          dept.title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, (state) => {
        state.departments = []
      })
  },
})

export const departmentsReducer = slice.reducer
export const departmentsActions = slice.actions
export const departmentsThunks = {
  fetchDepartments,
  addDepartment,
  removeDepartment,
  changeDepartmentTitle,
}

// types
//export type FilterValuesType = 'all' | 'active' | 'completed'
export type DepartmentDomainType = DepartmentType & {
  entityStatus: RequestStatusType
}
