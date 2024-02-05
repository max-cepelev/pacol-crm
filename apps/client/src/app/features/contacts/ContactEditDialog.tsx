import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Prisma } from '../../../types'
import ConfirmModal from '../../components/modals/ConfirmModal'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useClients from '../../hooks/api/useClients'
import { useAuthStore } from '../../store/useAuthStore'
import { useSelectorsStore } from '../../store/useSelectorsStore'
import ClientSelector from '../clients/ClientSelector'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  marginTop: '10px',
  width: 'clamp(350px, 20vw, 500px)',
  gridTemplateAreas: `
      'name'
      'client'
      'email'
      'phone'
      'description'
    `,
  gap: '15px',
}))

interface Props {
  open: boolean
  contact?: Prisma.ContactUncheckedCreateInput
  onSave: (contact: Prisma.ContactUncheckedCreateInput) => void
  onDelete?: (contactId: number) => void
  onClose: () => void
}

export default function ContactEditDialog({
  open,
  contact,
  onSave,
  onClose,
  onDelete,
}: Props) {
  const user = useAuthStore((store) => store.user)
  const { clientId, distributorId } = useSelectorsStore()

  let initState: Prisma.ContactUncheckedCreateInput = {
    name: '',
    email: '',
    phone: null,
    description: null,
    clientId: clientId || 0,
    distributorId: user?.distributorId || distributorId || 0,
  }

  const [state, setState] = useState(initState)
  const { clients, loading: isClientsLoading } = useClients({
    distributorId: distributorId || undefined,
  })
  const [confirmModal, setConformModal] = useState(false)
  let error =
    state.distributorId == 0 ||
    state.clientId == 0 ||
    state.email == '' ||
    state.name == ''

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
    if (contact) {
      setState(contact)
    }
    return () => {
      setState(initState)
    }
  }, [contact])

  return (
    <Dialog onClose={handleCancel} open={open} maxWidth="xl">
      <DialogTitle sx={{ textAlign: 'center' }}>{state.name}</DialogTitle>
      <DialogContent>
        <Wrapper>
          <Box gridArea="client">
            <ClientSelector
              currentId={clientId}
              distributorId={distributorId}
              onSelect={(client) =>
                setState({ ...state, clientId: client || 0 })
              }
            />
          </Box>
          <TextField
            sx={{ gridArea: 'name' }}
            fullWidth
            size="small"
            value={state.name}
            error={state.name == ''}
            name="name"
            label="Имя"
            onChange={(e) =>
              setState(() => ({ ...state, name: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'description', height: '100%' }}
            error={state.description == ''}
            fullWidth
            size="small"
            InputProps={{ sx: { height: '100%' } }}
            value={state.description || ''}
            multiline
            rows={3}
            name="description"
            label="Инфо"
            onChange={(e) =>
              setState(() => ({ ...state, description: e.target.value }))
            }
          />

          <TextField
            sx={{ gridArea: 'email' }}
            fullWidth
            size="small"
            value={state.email || ''}
            name="email"
            error={state.email == ''}
            label="E-mail"
            onChange={(e) =>
              setState(() => ({ ...state, email: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'phone' }}
            fullWidth
            size="small"
            value={state.phone || ''}
            name="phone"
            label="Телефон"
            onChange={(e) =>
              setState(() => ({ ...state, phone: e.target.value }))
            }
          />
        </Wrapper>
      </DialogContent>
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
