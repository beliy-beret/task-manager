import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField, Typography } from '@mui/material'

type EditableSpanPropsType = {
  isEdit: boolean
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  const [title, setTitle] = useState(props.value)

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const setNewTitle = () => props.onChange(title)
  const onPressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onChange(title)
    }
  }

  return props.isEdit ? (
    <TextField
      value={title}
      onChange={titleHandler}
      onBlur={setNewTitle}
      onKeyDown={onPressEnter}
      size='small'
    />
  ) : (
    <Typography variant='h3' sx={{ fontSize: '1.5rem' }}>
      {props.value}
    </Typography>
  )
})
