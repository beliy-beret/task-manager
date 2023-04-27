import { DepartmentList } from './departmentList/DepartmentList'
import React from 'react'
import { selectDepartments } from './departments.selectors'
import { useSelector } from 'react-redux'

export const Departments = () => {
  const departments = useSelector(selectDepartments)

  return (
    <>
      <DepartmentList departmentList={departments} />
    </>
  )
}
