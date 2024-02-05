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
import { useAuthStore } from '../../store/useAuthStore'
import CategorySelector from './CategorySelector'

const Content = styled(DialogContent)(() => ({
  display: 'grid',
  width: 'clamp(550px, 20vw, 800px)',
  gridTemplateAreas: `
      'name        name'
      'description description'
      'link        link'
      'category    subcategory'
      'price       .'
    `,
  gap: '10px',
}))

interface Props {
  open: boolean
  product?: Prisma.ProductUncheckedCreateInput
  onSave: (product: Prisma.ProductUncheckedCreateInput) => void
  onDelete?: (clientId: number) => void
  onClose: () => void
}

export default function ProductEditDialog({
  open,
  product,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const user = useAuthStore((store) => store.user)
  const initState: Prisma.ProductUncheckedCreateInput = {
    name: '',
    description: null,
    price: 0,
    images: [],
    video: null,
    instruction: null,
    categoryId: 0,
    subcategoryId: null,
  }
  const [confirmModal, setConformModal] = useState(false)
  const [state, setState] = useState(initState)

  let error = state.categoryId == 0 || state.price == 0 || state.name == ''

  const handleCancel = () => {
    onClose()
    setState(initState)
  }

  const handleSave = () => {
    onSave(state)
    handleCancel()
  }

  const handleDelete = (id: number) => {
    onDelete && onDelete(id)
    handleCancel()
    setConformModal(false)
  }

  useEffect(() => {
    if (product) {
      setState(product)
    }
    return () => {
      setState(initState)
    }
  }, [product])

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
          rows={5}
          name="description"
          label="Описание"
          onChange={(e) =>
            setState(() => ({ ...state, description: e.target.value }))
          }
        />
        <TextField
          sx={{ gridArea: 'link' }}
          fullWidth
          size="small"
          value={Array.isArray(state.images) ? state.images[0] || '' : ''}
          name="link"
          label="Ссылка на изображение"
          onChange={(e) =>
            setState(() => ({
              ...state,
              images: e.target.value ? [e.target.value] : [],
            }))
          }
        />
        <TextField
          sx={{ gridArea: 'price' }}
          size="small"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: '0.01' }}
          value={state.price.toFixed(2)}
          type="number"
          label="Базовая цена"
          onChange={({ target: { value } }) => {
            const price = value ? parseFloat(value) : 0
            setState(() => ({
              ...state,
              price,
            }))
          }}
        />
        <Box gridArea="category">
          <CategorySelector
            values="categories"
            currentId={state.categoryId}
            fullWidth
            onSelect={(categoryId) =>
              setState({ ...state, categoryId: categoryId || 0 })
            }
          />
        </Box>
        <Box gridArea="subcategory">
          <CategorySelector
            values="subcategories"
            currentId={state.subcategoryId || 0}
            categoryId={state.categoryId}
            fullWidth
            nullSelect
            onSelect={(categoryId) =>
              setState({ ...state, subcategoryId: categoryId || 0 })
            }
          />
        </Box>
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
