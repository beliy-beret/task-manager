import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import React, { memo, useState } from 'react'
import { RemoveTaskArgType, TaskType, UpdateTaskArgType } from '../tasks.api'

import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import SettingsIcon from '@mui/icons-material/Settings'
import TimerOffIcon from '@mui/icons-material/TimerOff'

type PropsType = {
  task: TaskType
  updateTask: (formData: UpdateTaskArgType) => void
  removeTask: ({ taskId, todolistId }: RemoveTaskArgType) => void
}

export const Task = memo(({ task, removeTask, updateTask }: PropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [isEdit, setIsEdit] = useState(false)
  const activateEditMode = () => {
    setIsEdit(true)
    handleClose()
  }

  const changeTask = (formData: UpdateTaskArgType) => {
    updateTask(formData)
    setIsEdit(false)
  }

  const deleteTask = () => {
    removeTask({ taskId: task.id, todolistId: task.todoListId })
    setIsEdit(false)
  }

  return (
    <Paper elevation={3}>
      <Card>
        <CardHeader
          title={task.title}
          action={
            <IconButton onClick={handleClick}>
              <SettingsIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant='body1'>
            {task.description || 'Description is empty.'}
          </Typography>
          <Divider sx={{ m: '8px' }} />
          <Box display={'flex'} alignItems={'center'}>
            <Box display={'flex'}>
              <QueryBuilderIcon />
              <Typography>{task.addedDate}</Typography>
            </Box>
            {task.deadline && (
              <Box display={'flex'}>
                <TimerOffIcon />
                <Typography>{task.deadline}</Typography>{' '}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      <Menu
        open={isOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={activateEditMode}>
          <DriveFileRenameOutlineIcon /> Change
        </MenuItem>
        <MenuItem onClick={deleteTask}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
    </Paper>
  )
})
