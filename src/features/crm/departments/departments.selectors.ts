import { AppRootStateType } from 'app/store'

export const selectDepartments = (state: AppRootStateType) =>
  state.departments.departments
export const selectActiveDepartmentId = (state: AppRootStateType) =>
  state.departments.activeDepartmentId
