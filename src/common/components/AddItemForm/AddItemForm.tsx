import { IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { AddBox } from '@mui/icons-material'
import { RejectValueType } from 'common/utils/create-app-async-thunk'

type Props = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = React.memo(function ({
  addItem,
  disabled = false,
}: Props) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
        .then(() => {
          setTitle('')
        })
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages
            setError(
              messages.length
                ? messages[0]
                : 'Some error'
            )
          }
        })
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant='outlined'
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label='Title'
        helperText={error}
      />
      <IconButton color='primary' onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
})
