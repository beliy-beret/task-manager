import { Box, Divider, Typography } from '@mui/material'
import { departmentsActions, departmentsThunks } from './departments.reducer'
import {
  selectActiveDepartmentId,
  selectDepartments,
} from './departments.selectors'

import { AddItemForm } from 'common/components'
import { DepartmentList } from './departmentList/DepartmentList'
import React from 'react'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Departments = () => {
  const departments = useSelector(selectDepartments)
  const activeDepartmentId = useSelector(selectActiveDepartmentId)
  const { addDepartment } = useActions(departmentsThunks)
  const addDepartmentCallback = (title: string) => {
    return addDepartment(title).unwrap()
  }
  const { changeActiveDepartmentId } = useActions(departmentsActions)
  return (
    <>
      <AddItemForm
        addItem={addDepartmentCallback}
        placeHolder={'Department name'}
      />
      <Divider orientation='horizontal' sx={{ m: '0.5rem 0' }} />
      {departments.length ? (
        <DepartmentList
          departmentList={departments}
          activeItemId={activeDepartmentId}
          changeActiveItem={changeActiveDepartmentId}
        />
      ) : (
        <Box>
          <Typography variant='h4' component='h2' textAlign={'center'}>
            List empty
          </Typography>
        </Box>
      )}
    </>
  )
}
