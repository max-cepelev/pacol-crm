import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Prisma } from '../../../types'
import ConfirmModal from '../../components/modals/ConfirmModal'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import DateSelector from '../../components/selectors/DateSelector'
import StatusSelector from '../../components/selectors/StatusSelector'
import useClients from '../../hooks/api/useClients'
import useDistributors from '../../hooks/api/useDistributors'
import { useAuthStore } from '../../store/useAuthStore'

const Content = styled(DialogContent)(() => ({
  display: 'grid',
  width: 'clamp(550px, 20vw, 600px)',
  gridTemplateAreas: `
      'name        name'
      'dateStart   dateEnd'
      'description description'
      'discount    status'
      'distributor client'
    `,
  gap: '10px',
}))

interface Props {
  open: boolean
  project?: Prisma.ProjectUncheckedCreateInput
  onSave: (client: Prisma.ProjectUncheckedCreateInput) => void
  onDelete?: (clientId: number) => void
  onClose: () => void
}

export default function ProjectEditDialog({
  open,
  project,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const user = useAuthStore((store) => store.user)
  const initState: Prisma.ProjectUncheckedCreateInput = {
    name: '',
    discount: null,
    startDate: new Date(),
    finishDate: null,
    statusId: 1,
    distributorId: user?.distributorId || 0,
    clientId: 0,
    groupId: 0,
  }
  const [confirmModal, setConformModal] = useState(false)
  const [dateStart, setDateStart] = useState<Date | null>(new Date())
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [state, setState] = useState(initState)
  const { clients, loading } = useClients({
    distributorId: user?.distributorId || state.distributorId,
  })
  const { distributors, loading: distributorsloading } = useDistributors()
  let error =
    state.distributorId == 0 ||
    state.clientId == 0 ||
    state.groupId == 0 ||
    state.name == '' ||
    dateStart == null

  const handleCancel = () => {
    onClose()
  }

  const handleSave = () => {
    onSave(state)
    onClose()
  }

  const handleDelete = (id: number) => {
    onDelete && onDelete(id)
    handleCancel()
    setConformModal(false)
  }

  useEffect(() => {
    if (project) {
      setState(project)
    }
    return () => {
      setState(initState)
    }
  }, [project])

  return (
    <Dialog onClose={handleCancel} open={open} maxWidth="xl">
      <DialogTitle sx={{ textAlign: 'center' }}>
        {state.name || 'Новый проект'}
      </DialogTitle>
      <Content>
        <TextField
          sx={{ gridArea: 'name', marginTop: 1 }}
          fullWidth
          size="small"
          value={state.name}
          error={state.name == ''}
          name="name"
          label="Наименование"
          onChange={(e) => setState(() => ({ ...state, name: e.target.value }))}
        />
        <TextField
          sx={{ gridArea: 'description', height: '100%' }}
          error={state?.description == ''}
          fullWidth
          size="small"
          InputProps={{ sx: { height: '100%' } }}
          value={state.description}
          multiline
          rows={2}
          name="description"
          label="Описание"
          onChange={(e) =>
            setState(() => ({ ...state, description: e.target.value }))
          }
        />
        <TextField
          sx={{ gridArea: 'discount' }}
          size="small"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value={state.discount || 0}
          type="number"
          label="Скидка"
          onChange={(e) => {
            const discount = parseFloat(e.target.value)
            if (discount >= 0 && discount < 100) {
              setState(() => ({
                ...state,
                discount: discount == 0 ? null : discount,
              }))
            }
          }}
        />
        <Box gridArea="dateStart">
          <DateSelector
            onChange={setDateStart}
            value={dateStart}
            fullWidth
            views={['year', 'month', 'day']}
            name="Дата начала"
            label="Дата начала"
            size="small"
          />
        </Box>
        <Box gridArea="dateEnd">
          <DateSelector
            onChange={setDateEnd}
            value={dateEnd}
            fullWidth
            views={['year', 'month', 'day']}
            name="Дата завершения"
            label="Дата завершения"
            size="small"
          />
        </Box>
        <Box gridArea="status">
          <StatusSelector
            statuses="project"
            fullWidth
            currentId={state.statusId || 1}
            onSelect={(statusId) =>
              statusId && setState((prev) => ({ ...prev, statusId }))
            }
          />
        </Box>
        <Box gridArea="client">
          <AutocompleteSelector
            fullWidth
            loading={loading}
            options={clients}
            current={clients.find((item) => item.id == state.clientId) || null}
            onChange={(option) =>
              setState((prev) => ({
                ...prev,
                clientId: option?.id || 0,
                groupId: option?.groupId || 0,
              }))
            }
            name={'Контрагент'}
            getOptionLabel={(option) => option.name}
          />
        </Box>
        {user?.role !== 'DISTRIBUTOR' && (
          <Box gridArea="distributor">
            <AutocompleteSelector
              fullWidth
              options={distributors}
              loading={distributorsloading}
              current={
                distributors.find((item) => item.id == state.distributorId) ||
                null
              }
              onChange={(option) =>
                setState((prev) => ({
                  ...prev,
                  distributorId: option?.id || 0,
                }))
              }
              name={'Дистрибьютор'}
              getOptionLabel={(option) => option.name}
            />
          </Box>
        )}
      </Content>
      <DialogActions>
        {state.id && onDelete ? (
          <Button color="error" onClick={() => setConformModal(true)}>
            Удалить
          </Button>
        ) : null}
        <Button onClick={handleCancel}>Отмена</Button>
        <Button disabled={error} onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
      <ConfirmModal
        open={confirmModal}
        onConfirm={() => state.id && handleDelete(state.id)}
        onClose={() => setConformModal(false)}
      />
    </Dialog>
  )
}
