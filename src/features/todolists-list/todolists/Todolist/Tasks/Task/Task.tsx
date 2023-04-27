import { Checkbox, IconButton } from '@mui/material'
import React, { ChangeEvent, FC, memo } from 'react'

import { Delete } from '@mui/icons-material'
import { TaskStatuses } from 'common/enums'
import { TaskType } from 'features/todolists-list/tasks/tasks.api'
import s from 'features/todolists-list/todolists/Todolist/Tasks/Task/styles.module.css'
import { tasksThunks } from 'features/todolists-list/tasks/tasks.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  task: TaskType
  todolistId: string
}

export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks)

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId })

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New
    updateTask({ taskId: task.id, domainModel: { status }, todolistId })
  }

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId })
  }

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? s.isDone : ''}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color='primary'
        onChange={changeStatusHandler}
      />

      {/* <EditableSpan value={task.title} onChange={changeTitleHandler} /> */}
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
