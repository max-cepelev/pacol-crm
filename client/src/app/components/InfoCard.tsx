import { mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { CardWrapper } from './ui/CardWrapper'

interface Props<T> {
  data: T
  fields: { key: keyof T; title: string }[]
  title?: string
  onEdit?: () => void
}

export default function InfoCard<T>({ data, fields, title, onEdit }: Props<T>) {
  return fields.length > 0 ? (
    <CardWrapper>
      {onEdit ? (
        <IconButton
          onClick={onEdit}
          sx={{ position: 'absolute', right: 3, top: 3 }}
        >
          <Icon path={mdiPencil} size="16px" />
        </IconButton>
      ) : null}
      {title ? (
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      ) : null}
      {fields.map((item) => (
        <Typography key={String(item.key)}>
          <>
            <b>{item.title}: </b>
            {data[item.key] || ''}
          </>
        </Typography>
      ))}
    </CardWrapper>
  ) : null
}
