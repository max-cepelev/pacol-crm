import { Button, TextField } from '@mui/material'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataGrid, { GridColumn } from '../components/DataGrid'
import BackdropLoading from '../components/ui/BackdropLoading'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import ToolbarWrapper from '../components/ui/ToolbarWrapper'
import ClientEditDialog from '../features/clients/ClientEditDialog'
import DistributorSelector from '../features/distributors/DistributorSelector'
import GroupAutocompleteSelector from '../features/groups/GroupAutocompleteSelector'
import useClientMutations from '../hooks/api/useClientMutations'
import useClients, { ClientsResponse } from '../hooks/api/useClients'
import { useAuthStore } from '../store/useAuthStore'
import { useSelectorsStore } from '../store/useSelectorsStore'

export default function ClientsPage() {
  let navigate = useNavigate()
  const [addDialog, setAddDialog] = useState(false)
  const user = useAuthStore((store) => store.user)
  const { groupId, distributorId, setDistributorId, setGroupId } =
    useSelectorsStore()
  const [term, setTerm] = useState('')

  const { clients, loading } = useClients({
    groupId,
    distributorId,
  })

  const filteredData = useMemo(
    () =>
      !term
        ? clients
        : clients.filter(
            (item) =>
              item.name.toLowerCase().includes(term) ||
              item.inn.toLowerCase().includes(term) ||
              (item.legalAddress &&
                item.legalAddress.toLowerCase().includes(term))
          ) || [],
    [clients, term]
  )

  const { create } = useClientMutations()
  const columns: GridColumn<ClientsResponse>[] = [
    {
      id: 0,
      title: 'Наименование',
      key: 'name',
    },
    {
      id: 1,
      key: 'inn',
      title: 'ИНН',
    },
    {
      id: 2,
      key: 'legalAddress',
      title: 'Юр. адрес',
    },
    {
      id: 3,
      title: 'Дистрибьютор',
      getCellValue: (row) => row.distributor.name,
    },
  ]

  useLayoutEffect(() => {
    user && setDistributorId(user.distributorId)
  }, [user])

  return (
    <ColumnWrapper>
      <BackdropLoading open={loading} />
      <ToolbarWrapper>
        <TextField
          value={term}
          onChange={({ target }) => setTerm(target.value.toLocaleLowerCase())}
          label="Имя, ИНН или адрес"
          size="small"
        />
        <DistributorSelector
          currentId={distributorId}
          onSelect={setDistributorId}
        />
        <GroupAutocompleteSelector
          currentId={groupId}
          distributorId={distributorId}
          onSelect={setGroupId}
        />
        <Button variant="outlined" onClick={() => setAddDialog(true)}>
          Добавить
        </Button>
      </ToolbarWrapper>
      <DataGrid
        rows={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        onSelect={(row) => navigate(`${row.id}`)}
      />
      <ClientEditDialog
        open={addDialog}
        onSave={(client) => create(client)}
        onClose={() => setAddDialog(false)}
      />
    </ColumnWrapper>
  )
}
