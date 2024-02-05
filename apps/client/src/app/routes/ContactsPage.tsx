import React, { useState } from 'react'
import { Contact, Prisma } from '../../types'
import CellEditButton from '../components/CellEditButton'
import DataGrid, { GridColumn } from '../components/DataGrid'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import ContactEditDialog from '../features/contacts/ContactEditDialog'
import ContactsPageToolbar from '../features/contacts/ContactsPageToolbar'
import useContactsService, {
  ContactsResponse,
} from '../hooks/api/useContactsService'
import { useAuthStore } from '../store/useAuthStore'
import { useSelectorsStore } from '../store/useSelectorsStore'

export default function ContactsPage() {
  const user = useAuthStore((store) => store.user)
  const { distributorId, clientId } = useSelectorsStore()
  const { contacts, create, update, remove } = useContactsService({
    distributorId: distributorId || undefined,
    clientId: clientId || undefined,
  })
  const [dialog, setDialog] = useState(false)
  const [editState, setEditState] =
    useState<Prisma.ContactUncheckedCreateInput | null>(null)

  const handleClose = () => {
    setDialog(false)
    setEditState(null)
  }

  const handleEdit = (contact: Prisma.ContactUncheckedCreateInput) => {
    setDialog(true)
    setEditState(contact)
  }

  const handleSave = (contact: Prisma.ContactUncheckedCreateInput) => {
    contact.id ? update({ id: contact.id, data: contact }) : create(contact)
  }

  const columns: GridColumn<ContactsResponse>[] = [
    {
      id: 0,
      title: 'Имя',
      key: 'name',
    },
    {
      id: 1,
      key: 'email',
      title: 'Email',
    },
    {
      id: 2,
      key: 'phone',
      title: 'Телефон',
    },
    {
      id: 3,
      key: 'description',
      title: 'Инфо',
    },
    {
      id: 4,
      title: 'Контрагент',
      component: (row) => (
        <CellEditButton text={row.client.name} onEdit={() => handleEdit(row)} />
      ),
    },
  ]

  return (
    <ColumnWrapper>
      <ContactsPageToolbar user={user} onAdd={() => setDialog(true)} />
      <DataGrid rows={contacts} columns={columns} getRowId={(row) => row.id} />
      <ContactEditDialog
        open={dialog}
        contact={editState || undefined}
        onSave={handleSave}
        onClose={handleClose}
        onDelete={(id) => remove(id)}
      />
    </ColumnWrapper>
  )
}
