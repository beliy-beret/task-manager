import React, { FC } from 'react'
import { Box, Button, MenuItem, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { UpdateTaskModelType } from '../tasks.api'
import { TaskStatuses } from 'common/enums'

type PropsType = {
  open: boolean
  initialValues: UpdateTaskModelType
  closeForm: (e: object, reason?: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit: (formData: UpdateTaskModelType) => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const statusOptions = [
  { value: TaskStatuses.New, label: 'new' },
  { value: TaskStatuses.InProgress, label: 'in progress' },
  { value: TaskStatuses.Completed, label: 'completed' },
]

export const TaskForm: FC<PropsType> = ({
  open,
  closeForm,
  onSubmit,
  initialValues,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values)
      closeForm({})
    },
  })

  return (
    <Modal open={open} onClose={closeForm}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label='Task title'
            margin='normal'
            {...formik.getFieldProps('title')}
          />
          <TextField
            fullWidth
            label='Task description'
            margin='normal'
            multiline
            rows={5}
            {...formik.getFieldProps('description')}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type={'date'}
            fullWidth
            label='Dead line'
            margin='normal'
            {...formik.getFieldProps('deadline')}
          />
          <TextField
            select
            label='Status'
            fullWidth
            margin='normal'
            defaultValue={initialValues.status}
            {...formik.getFieldProps('status')}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ mr: '0.5rem' }}
            >
              Save
            </Button>
            <Button
              variant={'contained'}
              color={'secondary'}
              onClick={closeForm}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
