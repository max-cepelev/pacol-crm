import React, { useMemo } from 'react'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useContactsService from '../../hooks/api/useContactsService'

interface Props {
  currentId: number | null
  distributorId?: number | null
  clientId?: number | null
  onSelect: (id: number | null) => void
  fullWidth?: boolean
}

export default function ContactSelector({
  currentId,
  distributorId,
  clientId,
  onSelect,
  fullWidth,
}: Props) {
  const { contacts, isLoading } = useContactsService({
    distributorId,
    clientId,
  })
  const current = useMemo(
    () => contacts.find((item) => item.id == currentId) || null,
    [currentId, contacts, distributorId, clientId]
  )
  return (
    <AutocompleteSelector
      options={contacts}
      loading={isLoading}
      current={current}
      onChange={(option) => onSelect(option?.id || null)}
      name="Контакт"
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.name}
    />
  )
}
