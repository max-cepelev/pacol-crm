import { Box, Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Prisma } from '../../types'
import CellEditButton from '../components/CellEditButton'
import DataGrid, { GridColumn } from '../components/DataGrid'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import ToolbarWrapper from '../components/ui/ToolbarWrapper'
import CategorySelector from '../features/products/CategorySelector'
import ProductEditDialog from '../features/products/ProductEditDialog'
import useProductsServices, {
  ProductsResponse,
} from '../hooks/api/useProductsServices'
import { useAuthStore } from '../store/useAuthStore'

export default function CatalogPage() {
  const user = useAuthStore((store) => store.user)
  const [dialog, setDialog] = useState(false)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null)
  const [editState, setEditState] =
    useState<Prisma.ProductUncheckedCreateInput | null>(null)
  const { products, update, create, remove } = useProductsServices({
    categoryId,
    subcategoryId,
  })

  const componentRef = useRef<HTMLDivElement>(null)

  //Функция кнопки распечатать
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  //Параметры страницы печати
  const getPageMargins = () => {
    return `@page { margin: 30px 30px 30px 30px !important; }`
  }

  const handleClose = () => {
    setDialog(false)
    setEditState(null)
  }

  const handleEdit = (project: Prisma.ProductUncheckedCreateInput) => {
    setDialog(true)
    setEditState(project)
  }

  const handleSave = (product: Prisma.ProductUncheckedCreateInput) => {
    product.id ? update({ id: product.id, data: product }) : create(product)
    handleClose()
  }

  const columns: GridColumn<ProductsResponse>[] = [
    {
      id: 0,
      title: 'Изображение',
      width: 120,
      component: (row) => (
        <img
          style={{ maxWidth: '100%' }}
          src={row.images[0] || '/no-image.svg'}
          alt={row.name}
        />
      ),
    },
    {
      id: 1,
      title: 'Наименование',
      key: 'name',
    },
    // {
    //   id: 2,
    //   title: 'Описание',
    //   key: 'description',
    //   maxWidth: 350,
    //   component: (row) => (
    //     <Tooltip
    //       title={row.description || ''}
    //       sx={{
    //         '&.MuiTooltip-tooltip': {
    //           width: 500,
    //         },
    //       }}
    //     >
    //       <Typography variant="inherit" overflow="hidden" maxHeight={160}>
    //         {row.description || 'нет описания'}
    //       </Typography>
    //     </Tooltip>
    //   ),
    // },
    {
      id: 3,
      title: 'Категория',
      getCellValue: (rowData) => rowData.category.name,
    },
    {
      id: 4,
      title: 'Подкатегория',
      getCellValue: (rowData) => rowData.subcategory?.name || '',
    },
    {
      id: 5,
      title: 'Цена, руб',
      width: 110,
      getCellValue: (rowData) =>
        user?.role == 'DISTRIBUTOR'
          ? parseFloat(
              (
                rowData.price -
                (rowData.price * (user?.distributor?.discount || 1)) / 100
              ).toFixed(2)
            )
          : rowData.price,
      component:
        user?.role !== 'DISTRIBUTOR'
          ? (row) => (
              <CellEditButton
                text={row.price.toFixed(2)}
                onEdit={() => handleEdit(row)}
              />
            )
          : undefined,
    },
  ]
  return (
    <ColumnWrapper>
      <ToolbarWrapper>
        <CategorySelector
          values="categories"
          currentId={categoryId}
          onSelect={setCategoryId}
          nullSelect
        />
        <CategorySelector
          values="subcategories"
          currentId={subcategoryId}
          categoryId={categoryId}
          onSelect={setSubcategoryId}
          nullSelect
        />
        {user?.role !== 'DISTRIBUTOR' && (
          <Button variant="outlined" onClick={() => setDialog(true)}>
            Добавить
          </Button>
        )}
        <Button variant="outlined" onClick={handlePrint}>
          Распечатать
        </Button>
      </ToolbarWrapper>
      <Box ref={componentRef}>
        <style>{getPageMargins()}</style>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.id}
          stickyHeader
          maxHeight={'none'}
        />
      </Box>
      <ProductEditDialog
        open={dialog}
        product={editState || undefined}
        onSave={handleSave}
        onDelete={(id) => remove(id)}
        onClose={handleClose}
      />
    </ColumnWrapper>
  )
}
