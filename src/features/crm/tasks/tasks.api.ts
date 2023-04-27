import { instance } from 'common/api'
import { ResponseType } from 'common/types/common.types'
import { TaskPriorities, TaskStatuses } from 'common/enums'
import { UpdateDomainTaskModelType } from 'features/todolists-list/tasks/tasks.reducer'

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<ResponseType>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`
    )
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<
      ResponseType<{
        item: TaskType
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    )
  },
}

// Types
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type AddTaskArgType = {
  title: string
  todolistId: string
}

export type UpdateTaskArgType = {
  taskId: string
  domainModel: UpdateDomainTaskModelType
  todolistId: string
}

export type RemoveTaskArgType = {
  todolistId: string
  taskId: string
}
