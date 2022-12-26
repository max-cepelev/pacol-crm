import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getService } from '../../api/services'
import { Distributor, Prisma } from '../../types'
import InfoCard from '../components/InfoCard'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import RowWrapper from '../components/ui/RowWrapper'
import { useEditorStore } from '../store/useEditorStore'

export default function DistributorPage() {
  const { id } = useParams()
  const onEdit = useEditorStore((store) => store.setDistributor)
  const { data } = useQuery(['distributor', id], () =>
    getService<Distributor & Prisma.DistributorInclude>({
      path: `/distributors/${id}`,
    })
  )
  return (
    <ColumnWrapper>
      <RowWrapper>
        {data && (
          <InfoCard
            data={data}
            title="Общая информация"
            onEdit={() =>
              onEdit({
                id: data.id,
                name: data.name,
                fullName: data.fullName,
                legalAddress: data.legalAddress,
                actualAddress: data.actualAddress,
                inn: data.inn,
                kpp: data.kpp,
                ogrn: data.ogrn,
                manager: data.manager,
                website: data.website,
                phone: data.phone,
                email: data.email,
                info: data.info,
                discount: data.discount,
              })
            }
            fields={[
              { title: 'Наименование', key: 'name' },
              { title: 'Полное наименование', key: 'fullName' },
              { title: 'ИНН', key: 'inn' },
              { title: 'Общая скидка, %', key: 'discount' },
            ]}
          />
        )}
      </RowWrapper>
    </ColumnWrapper>
  )
}
