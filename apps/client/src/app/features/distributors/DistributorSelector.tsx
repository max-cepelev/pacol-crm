import React, { useMemo } from 'react'
import AutocompleteSelector from '../../components/selectors/AutocompleteSelector'
import useDistributors from '../../hooks/api/useDistributors'

interface Props {
  currentId: number | null
  onSelect: (id: number | null) => void
  fullWidth?: boolean
  width?: string | number
}

export default function DistributorSelector({
  currentId,
  onSelect,
  fullWidth,
  width,
}: Props) {
  const { distributors, loading } = useDistributors()
  const current = useMemo(
    () => distributors.find((item) => item.id == currentId) || null,
    [currentId, distributors]
  )
  return (
    <AutocompleteSelector
      options={distributors}
      fullWidth={fullWidth}
      loading={loading}
      current={current}
      width={width}
      onChange={(option) => onSelect(option?.id || null)}
      name="Дистрибьютор"
      getOptionLabel={(option) => option.name}
    />
  )
}
