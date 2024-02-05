import React, { useMemo } from 'react'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useClients from '../../hooks/api/useClients'

interface Props {
  currentId: number | null
  distributorId?: number | null
  groupId?: number | null
  onSelect: (id: number | null) => void
  fullWidth?: boolean
}

export default function ClientSelector({
  currentId,
  distributorId,
  groupId,
  onSelect,
  fullWidth,
}: Props) {
  const { clients, loading } = useClients({
    distributorId,
    groupId,
  })
  const current = useMemo(
    () => clients.find((item) => item.id == currentId) || null,
    [currentId, clients, distributorId, groupId]
  )
  return (
    <AutocompleteSelector
      options={clients}
      loading={loading}
      current={current}
      onChange={(option) => onSelect(option?.id || null)}
      name="Контрагент"
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.name}
    />
  )
}
