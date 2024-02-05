import { Box, List, ListItemText, styled, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getService } from '../../api/services'
import {
  Client,
  Contact,
  Distributor,
  Group,
  Prisma,
  Project,
  Task,
} from '../../types'
import { getDateFormat } from '../../utils/dateFormatter'
import { excludeFields } from '../../utils/excludeFields'
import InfoCard from '../components/InfoCard'
import ClientEditDialog from '../features/clients/ClientEditDialog'
import useClientMutations from '../hooks/api/useClientMutations'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  width: 'max-content',
  gridTemplateAreas: `
      'info     info projects'
      'clients tasks projects'
    `,
  gap: '15px',
}))

interface Response extends Client {
  distributor: Distributor
  group: Group
  tasks: Task[]
  projects: Project[]
  contacts: Contact[]
}

export default function ClientPage() {
  const { id } = useParams()
  const [editState, setEditState] =
    useState<Prisma.ClientUncheckedCreateInput | null>(null)
  const { create, update, remove } = useClientMutations()
  const { data } = useQuery(['client', id], () =>
    getService<Response>({
      path: `/clients/${id}`,
    })
  )
  return (
    <Wrapper>
      <Box gridArea="info">
        {data && (
          <InfoCard
            data={data}
            title="Общая информация"
            onEdit={() =>
              setEditState(
                excludeFields(data, [
                  'distributor',
                  'group',
                  'tasks',
                  'projects',
                  'contacts',
                ])
              )
            }
            fields={[
              { title: 'Наименование', key: 'name' },
              { title: 'Полное наименование', key: 'fullName' },
              { title: 'ИНН', key: 'inn' },
              { title: 'Общая скидка, %', key: 'legalAddress' },
            ]}
          />
        )}
      </Box>
      <Box
        gridArea="clients"
        sx={{ backgroundColor: '#FFFFFF' }}
        boxShadow="5px 5px 5px -5px rgba(34, 60, 80, 0.6)"
        padding="12px"
      >
        <Typography variant="h6" fontWeight="bold">
          Клиенты:
        </Typography>
        <List>
          {data?.contacts.map((contact) => (
            <ListItemText
              key={contact.id}
              primary={contact.name}
              secondary={contact.email}
            />
          ))}
        </List>
      </Box>
      <Box
        gridArea="tasks"
        sx={{ backgroundColor: '#FFFFFF' }}
        boxShadow="5px 5px 5px -5px rgba(34, 60, 80, 0.6)"
        padding="12px"
      >
        <Typography variant="h6" fontWeight="bold">
          Задачи:
        </Typography>
        <List>
          {data?.tasks.map((task) => (
            <ListItemText
              key={task.id}
              primary={task.title}
              secondary={getDateFormat(task.dateStarted, {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            />
          ))}
        </List>
      </Box>
      <Box
        gridArea="projects"
        sx={{ backgroundColor: '#FFFFFF' }}
        boxShadow="5px 5px 5px -5px rgba(34, 60, 80, 0.6)"
        padding="12px"
        minWidth={300}
      >
        <Typography variant="h6" fontWeight="bold">
          Проекты:
        </Typography>
        <List>
          {data?.projects.map((project) => (
            <ListItemText
              key={project.id}
              primary={project.name}
              secondary={`Скидка: ${project.discount || 0} %`}
            />
          ))}
        </List>
      </Box>
      <ClientEditDialog
        open={Boolean(editState)}
        client={editState || undefined}
        onSave={(client) =>
          client.id ? update({ id: client.id, data: client }) : create(client)
        }
        onClose={() => setEditState(null)}
        onDelete={(id) => remove(id)}
      />
    </Wrapper>
  )
}
