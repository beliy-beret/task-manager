import { Box, Button, MenuItem, Modal, TextField } from '@mui/material'
import React, { FC } from 'react'

import { TaskStatuses } from 'common/enums'
import { UpdateTaskModelType } from '../tasks.api'
import { useFormik } from 'formik'

type PropsType = {
  open: boolean
  initialValues: UpdateTaskModelType
  closeForm: (e: object, reason?: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit: (formData: UpdateTaskModelType) => void
}

type FormErrorsType = Partial<UpdateTaskModelType>

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
    validate: (values) => {
      const errors: FormErrorsType = {}
      if (values.title?.length > 100) {
        errors.title = 'Max length 100'
      }
      if (values.description?.length > 1000) {
        errors.description = 'Max length 1000'
      }
      if (values.deadline < Date()) {
        errors.deadline = 'Date should be after now'
      }

      return errors
    },
  })
  console.log(formik.values.deadline)
  return (
    <Modal open={open} onClose={closeForm}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            size='small'
            fullWidth
            label='Task title'
            margin='normal'
            error={!!formik.errors.title}
            {...formik.getFieldProps('title')}
          />
          <TextField
            fullWidth
            label='Task description'
            margin='normal'
            multiline
            rows={5}
            error={!!formik.errors.description}
            {...formik.getFieldProps('description')}
          />
          <TextField
            size='small'
            InputLabelProps={{ shrink: true }}
            type={'date'}
            fullWidth
            label='Dead line'
            margin='normal'
            error={!!formik.errors.deadline}
            {...formik.getFieldProps('deadline')}
          />
          <TextField
            size='small'
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
              disabled={!formik.dirty || !formik.isValid}
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
