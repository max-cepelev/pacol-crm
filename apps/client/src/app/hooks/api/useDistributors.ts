import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getService } from '../../../api/services'
import { Distributor } from '../../../types'

export default function useDistributors() {
  const {
    data: distributors = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    ['distributors'],
    async () => await getService<Distributor[]>({ path: '/distributors' }),
    { staleTime: 60000 }
  )
  return {
    distributors,
    loading,
    error,
  }
}
