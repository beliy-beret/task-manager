import { Box, Divider } from '@mui/material'
import React, { useEffect } from 'react'

import { AddItemForm } from 'common/components'
import { TaskList } from './taskList/TaskList'
import { selectActiveDepartmentId } from '../departments/departments.selectors'
import { selectTasks } from './tasks.selectors'
import { tasksThunks } from './tasks.reducer'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Tasks = () => {
  const tasks = useSelector(selectTasks)
  const activeDepartmentId = useSelector(selectActiveDepartmentId)
  const { addTask, fetchTasks } = useActions(tasksThunks)
  const createTask = (title: string) =>
    addTask({ todolistId: activeDepartmentId, title })

  useEffect(() => {
    if (!activeDepartmentId) {
      return
    }
    fetchTasks(activeDepartmentId)
  }, [activeDepartmentId])
  return (
    <>
      <Box maxWidth={'380px'}>
        <AddItemForm addItem={createTask} placeHolder={'Task title'} />
      </Box>
      <Divider orientation='horizontal' sx={{ m: '0.5rem 0' }} />
      <TaskList taskList={tasks} />
    </>
  )
}
