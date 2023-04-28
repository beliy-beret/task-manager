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
import {
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from '../tasks.api'
import { useDrag } from 'react-dnd'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import SettingsIcon from '@mui/icons-material/Settings'
import TimerOffIcon from '@mui/icons-material/TimerOff'
import { ItemTypes } from '../taskList/TaskList'
import { TaskForm } from '../taskForm/TaskForm'

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

  const initialValues: UpdateTaskModelType = {
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
  }

  // Task logic
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
    <Paper elevation={3} ref={drag} sx={{ opacity: isDragging ? '0.5' : '1' }}>
      <Card>
        <CardHeader
          title={task.title}
          action={
            <IconButton onClick={openMenu}>
              <SettingsIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant='body1'>
            {task.description || 'Description is empty.'}
          </Typography>
          <Divider sx={{ m: '8px' }} />
          <Box display={'flex'} flexDirection={'column'}>
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
