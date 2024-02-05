import { mdiCancel, mdiClose, mdiPlus } from '@mdi/js'
import { Icon } from '@mdi/react'
import { Button, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ColumnWrapper from './ui/ColumnWrapper'
import RowWrapper from './ui/RowWrapper'

interface Props {
  onAdd: (name: string) => void
}

export default function AddStatusButton({ onAdd }: Props) {
  const [activeInput, setActiveInput] = useState(false)
  const [state, setState] = useState('')

  const handleClose = () => {
    setActiveInput(false)
    setState('')
  }

  const handleAdd = () => {
    state !== '' && onAdd(state)
    setActiveInput(false)
    setState('')
  }
  return (
    <Box
      sx={{
        padding: '0 7px',
        backgroundColor: activeInput ? '#FFFFFF' : undefined,
      }}
    >
      {activeInput ? (
        <ColumnWrapper sx={{ paddingTop: '7px' }}>
          <TextField
            value={state}
            size="small"
            onChange={({ target }) => setState(target.value)}
          />
          <RowWrapper>
            <Button onClick={handleAdd} variant="outlined">
              Добавить
            </Button>
            <IconButton onClick={handleClose}>
              <Icon
                path={mdiClose}
                // color={palette.primary.main}
                size="18px"
              />
            </IconButton>
          </RowWrapper>
        </ColumnWrapper>
      ) : (
        <Button variant="outlined" onClick={() => setActiveInput(true)}>
          <Icon
            path={mdiPlus}
            // color={palette.primary.main}
            size="18px"
          />
          Добавить колонку
        </Button>
      )}
    </Box>
  )
}
