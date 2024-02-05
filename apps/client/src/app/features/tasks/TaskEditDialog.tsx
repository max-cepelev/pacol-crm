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
import { useEffect, useState } from 'react'
import { Prisma } from '../../../types'
import ConfirmModal from '../../components/modals/ConfirmModal'
import DateTimeSelector from '../../components/selectors/DateTimeSelector'
import StatusSelector from '../../components/selectors/StatusSelector'
import { useAuthStore } from '../../store/useAuthStore'
import { useSelectorsStore } from '../../store/useSelectorsStore'
import ClientSelector from '../clients/ClientSelector'
import ContactSelector from '../contacts/ContactSelector'
import DistributorSelector from '../distributors/DistributorSelector'
import ProjectSelector from '../projects/ProjectSelector'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  marginTop: '10px',
  width: 'clamp(350px, 40vw, 500px)',
  gridTemplateAreas: `
      'title     title'
      'dateStart dateEnd'
      'content   content'
      'status    client'
      'project   contact'
      'distributor distributor'
    `,
  gap: '15px',
}))

interface Props {
  open: boolean
  task?: Prisma.TaskUncheckedCreateInput | null
  onSave: (task: Prisma.TaskUncheckedCreateInput) => void
  onDelete?: (taskId: number) => void
  onClose: () => void
}

export default function TaskEditDialog({
  task,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const user = useAuthStore((store) => store.user)
  const { distributorId } = useSelectorsStore()
  const initState: Prisma.TaskUncheckedCreateInput = {
    title: '',
    dateStarted: new Date(),
    dateEnded: null,
    content: '',
    statusId: 1,
    distributorId: user?.distributorId || distributorId,
    clientId: null,
    projectId: null,
    userId: user?.id || 0,
    contactId: null,
  }
  const [state, setState] = useState<Prisma.TaskUncheckedCreateInput>(initState)
  const [dateStart, setDateStart] = useState<Date | null>(new Date())
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [confirmModal, setConformModal] = useState(false)

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
    if (task) {
      setState(task)
    }
    return () => {
      setState(initState)
    }
  }, [task])

  return (
    <Dialog onClose={handleCancel} open={Boolean(task)} maxWidth="xl">
      <DialogTitle sx={{ textAlign: 'center' }}>
        {task?.title || ''}
      </DialogTitle>
      <DialogContent>
        {state && (
          <Wrapper>
            <TextField
              sx={{ gridArea: 'title' }}
              fullWidth
              size="small"
              value={state.title}
              error={state?.title == ''}
              name="title"
              label="Заголовок"
              onChange={(e) =>
                setState(() => ({ ...state, title: e.target.value }))
              }
            />
            <TextField
              sx={{ gridArea: 'content', height: '100%' }}
              error={state?.content == ''}
              fullWidth
              size="small"
              InputProps={{ sx: { height: '100%' } }}
              value={state.content}
              multiline
              rows={3}
              name="content"
              label="Содержание"
              onChange={(e) =>
                setState(() => ({ ...state, content: e.target.value }))
              }
            />
            <Box gridArea="dateStart">
              <DateTimeSelector
                fullWidth
                onChange={setDateStart}
                value={dateStart}
                name="Дата начала"
                label="Дата начала"
                size="small"
              />
            </Box>
            <Box gridArea="dateEnd">
              <DateTimeSelector
                fullWidth
                onChange={setDateEnd}
                value={dateEnd}
                name="Дата завершения"
                label="Дата завершения"
                size="small"
              />
            </Box>
            <Box gridArea="status">
              <StatusSelector
                fullWidth
                statuses="task"
                currentId={state.statusId || null}
                onSelect={(id) => id && setState({ ...state, statusId: id })}
              />
            </Box>
            <Box gridArea="client">
              <ClientSelector
                currentId={state.clientId || null}
                onSelect={(clientId) => setState({ ...state, clientId })}
                distributorId={user?.distributorId}
                fullWidth
              />
            </Box>
            <Box gridArea="contact">
              <ContactSelector
                currentId={state.contactId || null}
                clientId={state.clientId}
                onSelect={(contactId) => setState({ ...state, contactId })}
                distributorId={user?.distributorId}
                fullWidth
              />
            </Box>
            <Box gridArea="project">
              <ProjectSelector
                currentId={state.projectId || null}
                clientId={state.clientId}
                onSelect={(projectId) => setState({ ...state, projectId })}
                distributorId={user?.distributorId}
                fullWidth
              />
            </Box>
            {user?.role !== 'DISTRIBUTOR' && (
              <Box gridArea="distributor">
                <DistributorSelector
                  currentId={state.distributorId || null}
                  onSelect={(distributorId) =>
                    setState({ ...state, distributorId })
                  }
                  fullWidth
                />
              </Box>
            )}
          </Wrapper>
        )}
      </DialogContent>
      <DialogActions>
        {state && state.id ? (
          <Button color="error" onClick={() => setConformModal(true)}>
            Удалить
          </Button>
        ) : null}
        <Button onClick={handleCancel}>Отмена</Button>
        <Button
          // disabled={state?.name == '' || state?.fullName == ''}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </DialogActions>
      <ConfirmModal
        open={confirmModal}
        onConfirm={() => state?.id && handleDelete(state.id)}
        onClose={() => setConformModal(false)}
      />
    </Dialog>
  )
}
