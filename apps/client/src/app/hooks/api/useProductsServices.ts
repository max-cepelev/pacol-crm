import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import {
  deleteService,
  getService,
  patchService,
  postService,
} from '../../../api/services'
import { Category, Prisma, Product, Subcategory } from '../../../types'
import useNotification from '../useNotification'

interface Params {
  categoryId?: number | null
  subcategoryId?: number | null
}

export interface ProductsResponse extends Product {
  category: Category
  subcategory: Subcategory
}

export default function useProductsServices({
  categoryId,
  subcategoryId,
}: Params) {
  const client = useQueryClient()
  const { successNotice, errorNotice } = useNotification()
  const {
    data: products = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    ['products', categoryId, subcategoryId],
    async () =>
      await getService<ProductsResponse[]>({
        path: '/products',
        params: {
          categoryId: categoryId || undefined,
          subcategoryId: subcategoryId || undefined,
        },
      }),
    { staleTime: 60000 }
  )

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.ProductUncheckedCreateInput) =>
      await postService<Product, Prisma.ProductUncheckedCreateInput>({
        path: '/products',
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['products'])
        successNotice('Создан')
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
      data: Prisma.ProductUncheckedCreateInput
    }) =>
      await patchService<Product, { name: string }>({
        path: `/products/${id}`,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['products'])
        successNotice('Обновлен')
      },
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  const { mutate: remove, isLoading: isRemoving } = useMutation(
    async (id: number) =>
      await deleteService<Product>({
        path: `/products/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['products'])
        successNotice('Удален')
      },
      onError(error: AxiosError) {
        errorNotice(error.message)
      },
    }
  )

  return {
    products,
    create,
    update,
    remove,
    isCreating,
    isRemoving,
    isUpdating,
    loading,
    error,
  }
}
