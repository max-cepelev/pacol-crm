import React, { useMemo } from 'react'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useContactsService from '../../hooks/api/useContactsService'
import useProjects from '../../hooks/api/useProjects'

interface Props {
  currentId: number | null
  distributorId?: number | null
  clientId?: number | null
  onSelect: (id: number | null) => void
  fullWidth?: boolean
}

export default function ProjectSelector({
  currentId,
  distributorId,
  clientId,
  onSelect,
  fullWidth,
}: Props) {
  const { projects, loading } = useProjects({
    distributorId,
    clientId,
  })
  const current = useMemo(
    () => projects.find((item) => item.id == currentId) || null,
    [currentId, projects, distributorId, clientId]
  )
  return (
    <AutocompleteSelector
      options={projects}
      loading={loading}
      current={current}
      onChange={(option) => onSelect(option?.id || null)}
      name="Проект"
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.name}
    />
  )
}
