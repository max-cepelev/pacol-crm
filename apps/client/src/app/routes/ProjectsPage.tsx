import { Button } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import { Prisma } from '../../types'
import getDateFormat from '../../utils/getDateFormat'
import CellEditButton from '../components/CellEditButton'
import DataGrid, { GridColumn } from '../components/DataGrid'
import StatusSelector from '../components/selectors/StatusSelector'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import ToolbarWrapper from '../components/ui/ToolbarWrapper'
import ClientSelector from '../features/clients/ClientSelector'
import DistributorSelector from '../features/distributors/DistributorSelector'
import ProjectEditDialog from '../features/projects/ProjectEditDialog'
import useProjectMutations from '../hooks/api/useProjectMutations'
import useProjects, { ProjectsResponse } from '../hooks/api/useProjects'
import { useAuthStore } from '../store/useAuthStore'
import { useSelectorsStore } from '../store/useSelectorsStore'

export default function ProjectsPage() {
  const user = useAuthStore((store) => store.user)
  const {
    clientId,
    distributorId,
    projectStatusId,
    setClientId,
    setDistributorId,
    setProjectStatusId,
  } = useSelectorsStore()
  const { projects } = useProjects({
    distributorId: distributorId || undefined,
    clientId,
    statusId: projectStatusId,
  })

  const [dialog, setDialog] = useState(false)
  const [editState, setEditState] =
    useState<Prisma.ProjectUncheckedCreateInput | null>(null)

  const { create, update, remove } = useProjectMutations()

  const handleClose = () => {
    setDialog(false)
    setEditState(null)
  }

  const handleEdit = (project: Prisma.ProjectUncheckedCreateInput) => {
    setDialog(true)
    setEditState(project)
  }

  const handleSave = (project: Prisma.ProjectUncheckedCreateInput) => {
    project.id ? update({ id: project.id, data: project }) : create(project)
  }

  const columns: GridColumn<ProjectsResponse>[] = [
    {
      id: 0,
      title: 'Наименование',
      key: 'name',
    },
    {
      id: 1,
      title: 'Дата начала',
      getCellValue: (row) => getDateFormat(row.startDate),
    },
    {
      id: 2,
      title: 'Дата завершения',
      getCellValue: (row) => getDateFormat(row.finishDate),
    },
    {
      id: 3,
      key: 'discount',
      title: 'Доп. скидка',
      getCellValue: (row) =>
        row.discount ? row.discount + '%' : 'Не предоставляется',
    },
    {
      id: 4,
      title: 'Статус',
      getCellValue: (row) => row.status.name,
    },
    {
      id: 5,
      title: 'Контрагент',
      getCellValue: (row) => row.client.name,
    },
    {
      id: 6,
      title: 'Дистрибьютор',
      component: (row) => (
        <CellEditButton
          disabled={
            user?.role == 'DISTRIBUTOR' &&
            row.distributorId !== user?.distributorId
          }
          text={row.distributor.name}
          onEdit={() => handleEdit(row)}
        />
      ),
    },
  ]

  useLayoutEffect(() => {
    user && setDistributorId(user.distributorId)
  }, [user])

  return (
    <ColumnWrapper>
      <ToolbarWrapper>
        <DistributorSelector
          currentId={distributorId}
          onSelect={setDistributorId}
          width={280}
        />
        <ClientSelector
          currentId={clientId}
          distributorId={distributorId}
          onSelect={setClientId}
        />
        <StatusSelector
          statuses="project"
          currentId={projectStatusId}
          onSelect={setProjectStatusId}
          nullSelect
        />
        <Button variant="outlined" onClick={() => setDialog(true)}>
          Добавить
        </Button>
      </ToolbarWrapper>
      <DataGrid rows={projects} columns={columns} getRowId={(row) => row.id} />
      <ProjectEditDialog
        open={dialog}
        project={editState || undefined}
        onSave={handleSave}
        onClose={handleClose}
        onDelete={(id) => remove(id)}
      />
    </ColumnWrapper>
  )
}
