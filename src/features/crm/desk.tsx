import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'
import { departmentsThunks } from './departments/departments.reducer'
import { selectDepartments } from './departments/departments.selectors'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { selectTasks } from 'features/todolists-list/tasks/tasks.selectors'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Desk = () => {
  const departments = useSelector(selectDepartments)
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
          {departments.map((dept) => (
            <Box key={dept.id}>{dept.title}</Box>
          ))}
        </Box>
      </Grid>
      <Grid item>
        <Box>Grid</Box>
      </Grid>
    </Grid>
  )
}
