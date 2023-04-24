import React, { FC, memo, useEffect } from 'react'

import { AddItemForm } from 'common/components'
import { FilterTasksButtons } from 'features/todolists-list/todolists/Todolist/FilterTasksButtons/FilterTasksButtons'
import { TaskType } from 'features/todolists-list/tasks/tasks.api'
import { Tasks } from 'features/todolists-list/todolists/Todolist/Tasks/Tasks'
import { TodolistDomainType } from 'features/todolists-list/todolists/todolists.reducer'
import { TodolistTitle } from 'features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle'
import { tasksThunks } from 'features/todolists-list/tasks/tasks.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}
export const Todolist: FC<PropsType> = memo(({ todolist, tasks }) => {
  const { fetchTasks, addTask } = useActions(tasksThunks)

  useEffect(() => {
    fetchTasks(todolist.id)
  }, [])

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap()
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
        disabled={todolist.entityStatus === 'loading'}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: '10px' }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  )
})
