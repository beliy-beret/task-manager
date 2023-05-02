import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import React, { memo, useState } from 'react'
import {
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from '../tasks.api'

import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { ItemTypes } from '../taskList/TaskList'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import SettingsIcon from '@mui/icons-material/Settings'
import { TaskForm } from '../taskForm/TaskForm'
import TimerOffIcon from '@mui/icons-material/TimerOff'
import { useDrag } from 'react-dnd'

type PropsType = {
  task: TaskType
  updateTask: (args: UpdateTaskArgType) => void
  removeTask: ({ taskId, todolistId }: RemoveTaskArgType) => void
}

export const Task = memo(({ task, removeTask, updateTask }: PropsType) => {
  // Menu display logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  // DnD logic
  const [{ isDragging }, drag] = useDrag<
    Pick<TaskType, 'id' | 'todoListId'>,
    unknown,
    { isDragging: boolean }
  >({
    type: ItemTypes.TASK,
    item: { id: task.id, todoListId: task.todoListId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // Form logic
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false)
  const openForm = () => setFormIsOpen(true)
  const closeForm = (
    event: object,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason !== 'backdropClick') {
      setFormIsOpen(false)
    }
  }

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  const getTodayDate = () => {
    const date = new Date()
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  }

  const today = getTodayDate()

  const initialValues: UpdateTaskModelType = {
    title: task.title,
    deadline: task.deadline || today,
    description: task.description || '',
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
  }

  // Task logic
  const [isEllipsis, setIsEllipsis] = useState(true)
  const isEllipsisHandler = () => setIsEllipsis(!isEllipsis)

  const editTaskHandler = () => {
    openForm()
    closeMenu()
  }
  const deleteTask = () => {
    removeTask({ taskId: task.id, todolistId: task.todoListId })
  }
  const changeTask = (formData: UpdateTaskModelType) =>
    updateTask({
      taskId: task.id,
      todolistId: task.todoListId,
      domainModel: formData,
    })

  return (
    <Paper
      elevation={3}
      ref={drag}
      sx={{ opacity: isDragging ? '0.5' : '1', fontSize: '16px', p: '8px' }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='h6' component={'h3'}>
          {task.title}
        </Typography>
        <IconButton onClick={openMenu}>
          <SettingsIcon fontSize='small' />
        </IconButton>
      </Box>
      <Divider />
      <Typography
        paragraph
        variant='body2'
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: isEllipsis ? '2' : 'none',
          WebkitBoxOrient: 'vertical',
          mt: '8px',
          cursor: 'pointer',
        }}
        onClick={isEllipsisHandler}
      >
        {task.description || 'Description is empty.'}
      </Typography>
      <Divider />
      <Box display={'flex'} flexDirection={'column'} sx={{ mt: '8px' }}>
        <Box display={'flex'}>
          <QueryBuilderIcon fontSize='small' />
          <Typography component={'span'} sx={{ fontSize: '0.8rem' }}>
            {task.addedDate}
          </Typography>
        </Box>
        {task.deadline && (
          <Box display={'flex'}>
            <TimerOffIcon fontSize='small' />
            <Typography component='span' sx={{ fontSize: '0.8rem' }}>
              {task.deadline}
            </Typography>
          </Box>
        )}
      </Box>

      <Menu
        open={isOpen}
        onClose={closeMenu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={editTaskHandler}>
          <DriveFileRenameOutlineIcon /> Change
        </MenuItem>
        <MenuItem onClick={deleteTask}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
      <TaskForm
        open={formIsOpen}
        closeForm={closeForm}
        initialValues={initialValues}
        onSubmit={changeTask}
      />
    </Paper>
  )
})
