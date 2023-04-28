import React, { FC } from 'react'

import { Box } from '@mui/material'
import { Task } from '../task/Task'
import { TaskType } from '../tasks.api'
import { tasksThunks } from '../tasks.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  taskList: TaskType[]
}

export const TaskList: FC<PropsType> = ({ taskList }) => {
  const { removeTask, updateTask } = useActions(tasksThunks)

  const tasks = taskList.map((t) => (
    <Task key={t.id} task={t} updateTask={updateTask} removeTask={removeTask} />
  ))

  return <Box>{tasks}</Box>
}
