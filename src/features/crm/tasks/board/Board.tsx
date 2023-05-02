import { BoardTitles, ItemTypes } from '../taskList/TaskList'
import { Box, Typography } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { TaskType, UpdateTaskArgType } from '../tasks.api'

import { TaskStatuses } from 'common/enums'
import { useDrop } from 'react-dnd'

type PropsType = {
  children: ReactNode
  title: string
  onDrop: (args: UpdateTaskArgType) => void
}

export const Board: FC<PropsType> = ({ children, title, onDrop }) => {
  const taskStatus =
    title === BoardTitles.NEW
      ? TaskStatuses.New
      : title === BoardTitles.INPROGRESS
      ? TaskStatuses.InProgress
      : TaskStatuses.Completed

  const [{ isOver }, drop] = useDrop<
    Pick<TaskType, 'id' | 'todoListId'>,
    unknown,
    { isOver: boolean }
  >({
    accept: ItemTypes.TASK,
    drop: (args) => {
      onDrop({
        taskId: args.id,
        todolistId: args.todoListId,
        domainModel: { status: taskStatus },
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const boardBG =
    title === BoardTitles.NEW
      ? '#9dede8'
      : title === BoardTitles.INPROGRESS
      ? '#f1c8f7'
      : '#b9f5b8'
  return (
    <Box
      ref={drop}
      display={'flex'}
      flexDirection={'column'}
      sx={{
        backgroundColor: boardBG,
        mr: '0.5rem',
        p: '0 0.5rem 1rem',
        height: '86vh',
        gap: '0.5rem',
        overflowY: 'scroll',
        border: isOver ? '3px solid grey' : 'none',
      }}
    >
      <Typography
        variant={'h3'}
        fontSize={'1.5rem'}
        textAlign={'center'}
        sx={{
          textDecoration: 'underline',
          position: 'sticky',
          top: 0,
          bgcolor: 'inherit',
          p: '0.5rem',
          zIndex: '1',
          opacity: '0.9',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}
