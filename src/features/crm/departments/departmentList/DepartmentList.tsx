import { Box } from '@mui/material'
import React, { FC } from 'react'

import { Department } from './Department/Department'
import { DepartmentType } from '../departments.api'
import { departmentsThunks } from '../departments.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  departmentList: DepartmentType[]
  activeItemId: string
  changeActiveItem: ({ id }: { id: string }) => void
}

export const DepartmentList: FC<PropsType> = ({
  departmentList,
  activeItemId,
  changeActiveItem,
}) => {
  const { changeDepartmentTitle, removeDepartment } =
    useActions(departmentsThunks)

  const departments = departmentList.map((dept) => {
    const deleteDepartment = () => removeDepartment(dept.id)
    const changeTitle = (title: string) =>
      changeDepartmentTitle({ id: dept.id, title })
    const toggleActiveStatus = () => changeActiveItem({ id: dept.id })
    return (
      <Department
        key={dept.id}
        title={dept.title}
        changeTitle={changeTitle}
        deleteDepartment={deleteDepartment}
        active={dept.id === activeItemId}
        toggleActiveStatus={toggleActiveStatus}
      />
    )
  })

  return <Box>{departments}</Box>
}
