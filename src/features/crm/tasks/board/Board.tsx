import { Box, Typography } from '@mui/material'
import React, { FC, ReactNode } from 'react'

import { BoardTitles, ItemTypes } from '../taskList/TaskList'
import { TaskStatuses } from 'common/enums'
import { TaskType, UpdateTaskArgType } from '../tasks.api'
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
        p: '0.5rem',
        height: '100%',
        gap: '0.5rem',
      }}
    >
      <Typography
        variant={'h3'}
        fontSize={'1.5rem'}
        textAlign={'center'}
        sx={{ textDecoration: 'underline' }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}
