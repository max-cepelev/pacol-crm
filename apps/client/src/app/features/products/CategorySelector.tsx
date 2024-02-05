import React, { useMemo } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getService } from '../../../api/services'
import { Category, Subcategory } from '../../../types'

interface Props {
  values: 'categories' | 'subcategories'
  currentId: number | null
  onSelect: (id: number | null) => void
  size?: 'small' | 'medium'
  fullWidth?: boolean
  nullSelect?: boolean
  categoryId?: number | null
}

export default function CategorySelector({
  values,
  currentId,
  onSelect,
  size = 'small',
  fullWidth = false,
  categoryId,
  nullSelect,
}: Props) {
  const names = {
    categories: 'Категория',
    subcategories: 'Подкатегория',
  }
  const {
    data: options = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    [values, categoryId],
    async () =>
      await getService<(Category | Subcategory)[]>({
        path: `/${values}`,
        params:
          values == 'subcategories'
            ? { categoryId: categoryId || undefined }
            : undefined,
      }),
    { staleTime: 60000 }
  )

  const current = useMemo(
    () => options.find((item) => item.id == currentId) || null,
    [currentId, categoryId]
  )

  const handleChange = (event: SelectChangeEvent<number | string>) => {
    const {
      target: { value },
    } = event
    onSelect(+value == 0 ? null : +value)
  }

  if (loading)
    return (
      <Box sx={{ minWidth: 135, padding: 1 }}>
        <LinearProgress />
      </Box>
    )

  return (
    <FormControl
      sx={{ m: 0, minWidth: 135 }}
      fullWidth={fullWidth}
      error={error}
    >
      <InputLabel id="complex-label">{names[values]}</InputLabel>
      <Select
        size={size}
        fullWidth={fullWidth}
        value={current?.id || 0}
        onChange={handleChange}
        input={
          <OutlinedInput label={names[values]} size={size} error={error} />
        }
      >
        <MenuItem disabled={!nullSelect} value={0}>
          Не выбрана
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
