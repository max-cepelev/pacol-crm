import React from 'react'
import { mdiPencil } from '@mdi/js'
import { Icon } from '@mdi/react'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
  text: string | null
  onEdit: () => void
  disabled?: boolean
}

export default function CellEditButton({ text, onEdit, disabled }: Props) {
  return (
    <Box position="relative">
      <Typography variant="inherit">{text || ''}</Typography>
      <IconButton
        disabled={disabled}
        onClick={onEdit}
        size="small"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
        }}
      >
        <Icon path={mdiPencil} size="18px" />
      </IconButton>
    </Box>
  )
}
