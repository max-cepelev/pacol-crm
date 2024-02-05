import { Button } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Distributor } from '../../types'
import DataGrid, { GridColumn } from '../components/DataGrid'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import ToolbarWrapper from '../components/ui/ToolbarWrapper'
import useDistributors from '../hooks/api/useDistributors'
import { useEditorStore } from '../store/useEditorStore'

export default function DistributorsPage() {
  const navigate = useNavigate()
  const { distributors, loading } = useDistributors()
  const setDistributor = useEditorStore((store) => store.setDistributor)

  const columns: GridColumn<Distributor>[] = [
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
      key: 'discount',
      title: 'Скидка',
      getCellValue: (row) => row.discount + '%',
    },
  ]
  return (
    <ColumnWrapper>
      <ToolbarWrapper>
        <Button
          variant="outlined"
          onClick={() =>
            setDistributor({
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
              discount: 0,
            })
          }
        >
          Добавить
        </Button>
      </ToolbarWrapper>
      <DataGrid
        rows={distributors}
        columns={columns}
        getRowId={(row) => row.id}
        onSelect={(row) => navigate(`${row.id}`)}
      />
    </ColumnWrapper>
  )
}
