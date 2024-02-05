import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import {
  deleteService,
  getService,
  patchService,
  postService,
} from '../../../api/services'
import { Contact, Prisma } from '../../../types'
import useNotification from '../useNotification'

export interface ContactsResponse extends Contact {
  client: { name: string }
}

export default function useContactsService({
  distributorId,
  clientId,
}: {
  distributorId?: number | null
  clientId?: number | null
}) {
  const client = useQueryClient()
  const { successNotice, errorNotice } = useNotification()
  const { data: contacts = [], isLoading } = useQuery(
    ['contacts', distributorId, clientId],
    async () =>
      await getService<ContactsResponse[]>({
        path: '/contacts',
        params: {
          distributorId: distributorId || undefined,
          clientId: clientId || undefined,
        },
      }),
    {
      staleTime: 600000,
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.ContactUncheckedCreateInput) =>
      await postService<Contact, Prisma.ContactUncheckedCreateInput>({
        path: '/contacts',
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['contacts'])
      },
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  const { mutate: update, isLoading: isUpdating } = useMutation(
    async ({
      id,
      data,
    }: {
      id: number
      data: Prisma.ContactUncheckedCreateInput
    }) =>
      await patchService<Contact, { name: string }>({
        path: `/contacts/${id}`,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['contacts'])
      },
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  const { mutate: remove, isLoading: isRemoving } = useMutation(
    async (id: number) =>
      await deleteService<Contact>({
        path: `/contacts/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['contacts'])
        successNotice('Удалена')
      },
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  return {
    contacts,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
    remove,
    isRemoving,
  }
}
