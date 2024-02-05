import { Button } from '@mui/material'
import React from 'react'
import { User } from '../../../types'
import ToolbarWrapper from '../../components/ui/ToolbarWrapper'
import { useSelectorsStore } from '../../store/useSelectorsStore'
import ClientSelector from '../clients/ClientSelector'
import DistributorSelector from '../distributors/DistributorSelector'

export default function ContactsPageToolbar({
  user,
  onAdd,
}: {
  user: User | null
  onAdd: () => void
}) {
  const { distributorId, setDistributorId, clientId, setClientId } =
    useSelectorsStore()

  return (
    <ToolbarWrapper>
      {user?.role !== 'DISTRIBUTOR' && (
        <DistributorSelector
          currentId={distributorId}
          onSelect={setDistributorId}
        />
      )}
      <ClientSelector
        currentId={clientId}
        distributorId={user?.distributorId || distributorId}
        onSelect={setClientId}
      />
      <Button variant="outlined" onClick={onAdd}>
        Добавить
      </Button>
    </ToolbarWrapper>
  )
}
