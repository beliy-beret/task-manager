import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'

import { Departments } from './departments/Departments'
import { Navigate } from 'react-router-dom'
import { departmentsThunks } from './departments/departments.reducer'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { selectTasks } from 'features/todolists-list/tasks/tasks.selectors'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Desk = () => {
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { addDepartment, fetchDepartments } = useActions(departmentsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchDepartments({})
  }, [])

  const addDepartmentCallback = (title: string) => {
    return addDepartment(title).unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Grid container>
      <Grid item>
        <Box>
          <Departments />
        </Box>
      </Grid>
      <Grid item>
        <Box>Grid</Box>
      </Grid>
    </Grid>
  )
}
