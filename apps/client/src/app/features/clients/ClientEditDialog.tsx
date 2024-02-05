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
import { preview } from 'vite'
import { Prisma } from '../../../types'
import ConfirmModal from '../../components/modals/ConfirmModal'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useDistributors from '../../hooks/api/useDistributors'
import { useAuthStore } from '../../store/useAuthStore'
import GroupSelector from '../groups/GroupSelector'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  marginTop: '10px',
  width: 'clamp(350px, 70vw, 800px)',
  gridTemplateAreas: `
      'groupSelector      name          name'
      'inn       fullName      fullName'
      'kpp       fullName      fullName'
      'ogrn      legalAddress  legalAddress'
      'email     legalAddress  legalAddress'
      'phone     actualAddress actualAddress'
      'website   actualAddress actualAddress'
      'manager   info          info'
      'distributor distributor distributor'
    `,
  gap: '15px',
}))

interface Props {
  open: boolean
  client?: Prisma.ClientUncheckedCreateInput
  onSave: (client: Prisma.ClientUncheckedCreateInput) => void
  onDelete?: (clientId: number) => void
  onClose: () => void
}

export default function ClientEditDialog({
  open,
  client,
  onSave,
  onClose,
  onDelete,
}: Props) {
  const user = useAuthStore((store) => store.user)

  const initState: Prisma.ClientUncheckedCreateInput = {
    name: '',
    fullName: '',
    legalAddress: null,
    actualAddress: null,
    inn: '',
    kpp: null,
    ogrn: null,
    manager: null,
    website: null,
    phone: null,
    email: null,
    info: null,
    distributorId: user?.distributorId || 0,
    groupId: 0,
  }

  const [state, setState] = useState(initState)
  const { distributors, loading } = useDistributors()
  const [confirmModal, setConformModal] = useState(false)
  let error =
    state.distributorId == 0 ||
    state.fullName == '' ||
    state.groupId == 0 ||
    state.inn == '' ||
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
    if (client) {
      setState(client)
    }
    return () => {
      setState(initState)
    }
  }, [client])

  return (
    <Dialog onClose={handleCancel} open={open} maxWidth="xl">
      <DialogTitle sx={{ textAlign: 'center' }}>{state.name}</DialogTitle>
      <DialogContent>
        <Wrapper>
          <Box gridArea="groupSelector">
            <GroupSelector
              fullWidth
              distributorId={user?.distributorId || undefined}
              currentId={state.groupId || 0}
              onSelect={(groupId) =>
                groupId && setState((prev) => ({ ...prev, groupId }))
              }
            />
          </Box>

          <Box gridArea="distributor">
            {user?.role !== 'DISTRIBUTOR' && (
              <AutocompleteSelector
                current={
                  distributors.find((item) => item.id == state.distributorId) ||
                  null
                }
                onChange={(distributor) =>
                  setState((prev) => ({
                    ...prev,
                    distributorId: distributor?.id || 0,
                  }))
                }
                loading={loading}
                options={distributors}
                name={'Дистрибьютор'}
                getOptionLabel={(option) => option.name}
              />
            )}
          </Box>

          <TextField
            sx={{ gridArea: 'name' }}
            fullWidth
            size="small"
            value={state.name}
            error={state.name == ''}
            name="name"
            label="Наименование"
            onChange={(e) =>
              setState(() => ({ ...state, name: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'fullName', height: '100%' }}
            error={state.fullName == ''}
            fullWidth
            size="small"
            InputProps={{ sx: { height: '100%' } }}
            value={state.fullName}
            multiline
            rows={3}
            name="fullName"
            label="Полное наименование"
            onChange={(e) =>
              setState(() => ({ ...state, fullName: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'legalAddress', height: '100%' }}
            fullWidth
            size="small"
            value={state.legalAddress || ''}
            multiline
            InputProps={{ sx: { height: '100%' } }}
            rows={3}
            name="legalAddress"
            label="Юридический адрес"
            onChange={(e) =>
              setState(() => ({ ...state, legalAddress: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'actualAddress', height: '100%' }}
            fullWidth
            size="small"
            value={state.actualAddress || ''}
            multiline
            InputProps={{ sx: { height: '100%' } }}
            rows={3}
            name="actualAddress"
            label="Фактический адрес"
            onChange={(e) =>
              setState(() => ({ ...state, actualAddress: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'inn' }}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={state.inn || ''}
            type="number"
            label="ИНН"
            error={state.inn?.length < 10}
            onChange={(e) => {
              const { value } = e.target
              if (value.length <= 10) {
                setState(() => ({ ...state, inn: value }))
              }
            }}
          />
          <TextField
            sx={{ gridArea: 'kpp' }}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={state.kpp || ''}
            type="number"
            label="КПП"
            onChange={(e) => {
              const { value } = e.target
              if (value.length <= 9) {
                setState(() => ({ ...state, kpp: value }))
              }
            }}
          />
          <TextField
            sx={{ gridArea: 'ogrn' }}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={state.ogrn || ''}
            type="number"
            label="ОГРН"
            onChange={(e) => {
              const { value } = e.target
              if (value.length <= 13) {
                setState(() => ({ ...state, ogrn: value }))
              }
            }}
          />
          <TextField
            sx={{ gridArea: 'email' }}
            fullWidth
            size="small"
            value={state.email || ''}
            name="email"
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
          <TextField
            sx={{ gridArea: 'website' }}
            fullWidth
            size="small"
            value={state.website || ''}
            name="website"
            label="Сайт"
            onChange={(e) =>
              setState(() => ({ ...state, website: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'manager' }}
            fullWidth
            size="small"
            value={state.manager || ''}
            name="manager"
            label="Руководитель"
            onChange={(e) =>
              setState(() => ({ ...state, manager: e.target.value }))
            }
          />
          <TextField
            sx={{ gridArea: 'info' }}
            fullWidth
            size="small"
            value={state.info || ''}
            name="info"
            label="Дополнительно"
            onChange={(e) =>
              setState(() => ({ ...state, info: e.target.value }))
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
