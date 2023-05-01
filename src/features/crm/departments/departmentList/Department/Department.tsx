import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { EditableSpan } from 'common/components'
import SettingsIcon from '@mui/icons-material/Settings'
import classes from './department.module.css'

type PropsType = {
  title: string
  active?: boolean
  changeTitle: (title: string) => void
  deleteDepartment: () => void
  toggleActiveStatus: () => void
}

export const Department = memo(
  ({
    title,
    changeTitle,
    deleteDepartment,
    active,
    toggleActiveStatus,
  }: PropsType) => {
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

    const itemClass = classes.item + ' ' + (active ? classes.active : '')

    return (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        className={itemClass}
        onClick={toggleActiveStatus}
      >
        <Box sx={{ pl: '0.5rem' }}>
          <EditableSpan isEdit={isEdit} value={title} onChange={rename} />
        </Box>

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
