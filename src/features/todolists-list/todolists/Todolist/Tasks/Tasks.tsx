import React, { FC } from 'react'

import { Task } from 'features/todolists-list/todolists/Todolist/Tasks/Task/Task'
import { TaskStatuses } from 'common/enums'
import { TaskType } from 'features/todolists-list/tasks/tasks.api'
import { TodolistDomainType } from 'features/todolists-list/todolists/todolists.reducer'

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Tasks: FC<PropsType> = ({ tasks, todolist }) => {
  let tasksForTodolist = tasks

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  )
}
