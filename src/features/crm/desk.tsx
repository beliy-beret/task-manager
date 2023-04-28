import React, { useEffect } from 'react'

import { Departments } from './departments/Departments'
import { Grid } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { Tasks } from './tasks/Tasks'
import { departmentsThunks } from './departments/departments.reducer'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Desk = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { fetchDepartments } = useActions(departmentsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchDepartments({})
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Grid container spacing={2} alignItems={'stretch'} sx={{ height: '100%' }}>
      <Grid item sx={{ borderRight: '2px solid grey', pr: '1rem' }} xs={2.5}>
        <Departments />
      </Grid>
      <Grid item xs={9.5}>
        <Tasks />
      </Grid>
    </Grid>
  )
}
