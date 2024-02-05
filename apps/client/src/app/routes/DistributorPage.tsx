import { Box, List, ListItemText, styled, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getService } from '../../api/services'
import { Client, Distributor, Project, Task } from '../../types'
import { getDateFormat } from '../../utils/dateFormatter'
import InfoCard from '../components/InfoCard'
import { useEditorStore } from '../store/useEditorStore'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  width: 'max-content',
  gridTemplateAreas: `
      'info     info projects'
      'clients tasks projects'
    `,
  gap: '15px',
}))

interface Response extends Distributor {
  clients: Client[]
  tasks: Task[]
  projects: Project[]
}

export default function DistributorPage() {
  const { id } = useParams()
  const onEdit = useEditorStore((store) => store.setDistributor)
  const { data } = useQuery(['distributor', id], () =>
    getService<Response>({
      path: `/distributors/${id}`,
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
              onEdit({
                id: data.id,
                name: data.name,
                fullName: data.fullName,
                legalAddress: data.legalAddress,
                actualAddress: data.actualAddress,
                inn: data.inn,
                kpp: data.kpp,
                ogrn: data.ogrn,
                manager: data.manager,
                website: data.website,
                phone: data.phone,
                email: data.email,
                info: data.info,
                discount: data.discount,
              })
            }
            fields={[
              { title: 'Наименование', key: 'name' },
              { title: 'Полное наименование', key: 'fullName' },
              { title: 'ИНН', key: 'inn' },
              { title: 'Общая скидка, %', key: 'discount' },
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
          {data?.clients.map((client) => (
            <ListItemText
              key={client.id}
              primary={client.name}
              secondary={`ИНН ${client.inn}`}
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
    </Wrapper>
  )
}
