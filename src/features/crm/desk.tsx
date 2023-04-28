import React, { useEffect } from 'react'

import { Departments } from './departments/Departments'
import { Grid } from '@mui/material'
import { Navigate } from 'react-router-dom'
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
    <Grid container sx={{ minHeight: '95vh' }}>
      <Grid item sx={{ borderRight: '2px solid grey', pr: '1rem' }} xs={4}>
        <Departments />
      </Grid>
      <Grid item xs={8}>
        Task list
      </Grid>
    </Grid>
  )
}
