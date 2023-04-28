import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { RejectValueType } from 'common/utils/create-app-async-thunk'

type Props = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
  placeHolder?: string
}

export const AddItemForm = React.memo(function ({
  addItem,
  disabled = false,
  placeHolder = 'Title',
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
            setError(messages.length ? messages[0] : 'Some error')
          }
        })
    } else {
      setError(`${placeHolder} is required`)
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
    <Box display={'flex'} justifyContent={'space-between'} gap={1} pt={1}>
      <TextField
        variant='outlined'
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label={placeHolder}
        helperText={error}
        size='small'
        fullWidth
      />
      <Button
        variant='contained'
        onClick={addItemHandler}
        disabled={disabled}
        sx={{ maxHeight: '2.4rem' }}
      >
        <AddIcon />
      </Button>
    </Box>
  )
})
