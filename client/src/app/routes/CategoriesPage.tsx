import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { getService } from '../../api/services'
import { Category } from '../../types'

export default function CategoriesPage() {
  const { pathname } = useLocation()

  const { data } = useQuery(
    ['categories'],
    async () => await getService<Category[]>({ path: pathname })
  )
  return <div>CategoriesPage</div>
}
