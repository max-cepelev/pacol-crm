import { mdiPencilOutline } from '@mdi/js'
import { Icon } from '@mdi/react'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { Task } from '../../../types'
import { getDateFormat } from '../../../utils/dateFormatter'
import { CardWrapper } from '../../components/ui/CardWrapper'
import RowWrapper from '../../components/ui/RowWrapper'

interface Props {
  task: Task & { user: { name: string }; client: { name: string } }
  onEdit: (task: Task) => void
}

export default function TaskCard({ task, onEdit }: Props) {
  return (
    <CardWrapper
      sx={{
        minHeight: 70,
        rowGap: '5px',
      }}
    >
      <IconButton
        onClick={() => onEdit(task)}
        size="small"
        sx={{ position: 'absolute', top: 1, right: 0 }}
      >
        <Icon path={mdiPencilOutline} size="16px" />
      </IconButton>
      <Typography>
        <strong>Заголовок: </strong>
        {task.title}
      </Typography>
      <Typography>
        <strong>Клиент: </strong>
        {task.client.name}
      </Typography>
      <RowWrapper sx={{ justifyContent: 'space-between' }}>
        <Typography component="span" variant="caption">
          {getDateFormat(task.dateStarted, {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
        </Typography>
        <Typography component="span" variant="caption">
          {task.user.name}
        </Typography>
      </RowWrapper>
    </CardWrapper>
  )
}
