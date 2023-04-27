import { ResponseType } from 'common/types'
import { instance } from 'common/api/common.api'

export const departmentsApi = {
  getDepartments() {
    return instance.get<DepartmentType[]>('todo-lists')
  },
  createDepartment(title: string) {
    return instance.post<ResponseType<{ item: DepartmentType }>>('todo-lists', {
      title: title,
    })
  },
  deleteDepartment(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateDepartment(arg: UpdateDepartmentNameArgType) {
    return instance.put<ResponseType>(`todo-lists/${arg.id}`, {
      title: arg.title,
    })
  },
}

// Types
export type DepartmentType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type UpdateDepartmentNameArgType = {
  id: string
  title: string
}
