import React, { useState } from 'react'
import { mdiPlus } from '@mdi/js'
import { Icon } from '@mdi/react'
import { IconButton, OutlinedInput, styled, Typography } from '@mui/material'

import RowWrapper from '../../components/ui/RowWrapper'

const ColumnWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary.main,
  padding: 10,
  paddingTop: 5,
  rowGap: 10,
  maxHeight: '100%',
  minHeight: 100,
  minWidth: 320,
  position: 'relative',
}))

interface Props {
  column: { id: number | string; name: string }
  children: React.ReactNode
  onEdit: (name: string) => void
  onAdd: (id: number | string) => void
}

export default function Column<T>({ children, column, onEdit, onAdd }: Props) {
  const [name, setName] = useState<string | null>(null)

  const handleEditEnd = () => {
    name && onEdit(name)
    setName(null)
  }

  const handleKeyDawn = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.code == 'Enter') {
      handleEditEnd()
    }
    if (e.code == 'Escape') {
      setName(null)
    }
  }
  return (
    <ColumnWrapper>
      {name ? (
        <OutlinedInput
          size="small"
          value={name}
          onBlur={handleEditEnd}
          onChange={({ target }) => setName(target.value)}
          autoFocus={true}
          onKeyDown={handleKeyDawn}
          sx={{ backgroundColor: '#FFFFFF' }}
        />
      ) : (
        <RowWrapper sx={{ justifyContent: 'space-between' }}>
          <Typography
            color={'#ffffff'}
            variant="subtitle1"
            fontWeight="bold"
            onClick={() => setName(column.name)}
          >
            {column.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onAdd(column.id)}
            title={'Добавить задачу'}
          >
            <Icon path={mdiPlus} size={'20px'} color="#FFFFFF" />
          </IconButton>
        </RowWrapper>
      )}
      {children}
    </ColumnWrapper>
  )
}
