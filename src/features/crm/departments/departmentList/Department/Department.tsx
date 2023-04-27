import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { EditableSpan } from 'common/components'
import SettingsIcon from '@mui/icons-material/Settings'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
  deleteDepartment: () => void
}

export const Department = memo(
  ({ title, changeTitle, deleteDepartment }: PropsType) => {
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

    const rename = useCallback((title: string) => {
      changeTitle(title)
      setIsEdit(false)
    }, [])

    return (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <EditableSpan isEdit={isEdit} value={title} onChange={rename} />

        <IconButton onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <Menu
          open={isOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={activateEditMode}>
            <DriveFileRenameOutlineIcon /> Rename
          </MenuItem>
          <MenuItem onClick={deleteDepartment}>
            <DeleteIcon /> Delete
          </MenuItem>
        </Menu>
      </Box>
    )
  }
)
