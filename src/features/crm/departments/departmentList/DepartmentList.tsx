import React, { FC } from 'react'

import { Box } from '@mui/material'
import { Department } from './Department/Department'
import { DepartmentType } from '../departments.api'
import { departmentsThunks } from '../departments.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  departmentList: DepartmentType[]
}

export const DepartmentList: FC<PropsType> = ({ departmentList }) => {
  const { changeDepartmentTitle, removeDepartment } =
    useActions(departmentsThunks)

  const departments = departmentList.map((dept) => {
    const deleteDepartment = () => removeDepartment(dept.id)
    const changeTitle = (title: string) =>
      changeDepartmentTitle({ id: dept.id, title })
    return (
      <Department
        key={dept.id}
        title={dept.title}
        changeTitle={changeTitle}
        deleteDepartment={deleteDepartment}
      />
    )
  })

  return <Box>{departments}</Box>
}
