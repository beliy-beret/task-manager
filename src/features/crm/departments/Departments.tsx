import {
  selectActiveDepartmentId,
  selectDepartments,
} from './departments.selectors'

import { AddItemForm } from 'common/components'
import { DepartmentList } from './departmentList/DepartmentList'
import { Divider } from '@mui/material'
import React from 'react'
import { departmentsThunks } from './departments.reducer'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

export const Departments = () => {
  const departments = useSelector(selectDepartments)
  const activeDepartmentId = useSelector(selectActiveDepartmentId)
  const { addDepartment } = useActions(departmentsThunks)
  const addDepartmentCallback = (title: string) => {
    return addDepartment(title).unwrap()
  }

  return (
    <>
      <AddItemForm
        addItem={addDepartmentCallback}
        placeHolder={'Department name'}
      />
      <Divider orientation='horizontal' sx={{ m: '0.5rem 0' }} />
      <DepartmentList
        departmentList={departments}
        activeItemId={activeDepartmentId}
      />
    </>
  )
}
