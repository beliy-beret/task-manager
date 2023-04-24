import React, { FC } from 'react'
import {
  TodolistDomainType,
  todolistsThunks,
} from 'features/todolists-list/todolists/todolists.reducer'

import { Delete } from '@mui/icons-material'
import { EditableSpan } from 'common/components'
import { IconButton } from '@mui/material'
import { useActions } from 'common/hooks'

type PropsType = {
  todolist: TodolistDomainType
}

export const TodolistTitle: FC<PropsType> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title })
  }

  return (
    <h3>
      <EditableSpan
        value={todolist.title}
        onChange={changeTodolistTitleHandler}
      />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={todolist.entityStatus === 'loading'}
      >
        <Delete />
      </IconButton>
    </h3>
  )
}
