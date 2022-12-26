import * as React from 'react'
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'solid 1px #e8ebed',
  borderLeft: 'solid 1px #e8ebed',
  padding: '5px 10px',
  [`&.${tableCellClasses.head}`]: {
    // opacity: "0.9",
    boxShadow: 'none',
    color: 'rgba(0,0,0,.67)',
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
    height: '40px',
    fontSize: '12px',
    borderTop: 'solid 1px #e8ebed',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#000000',
    // textOverflow: "ellipsis",
    height: '35px',
    fontStyle: 'italic',
    fontSize: '14px',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border

  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  // fontSize: "14px",
  backgroundColor: '#fafafa',
  fontFamily: '"Roboto", "Tahoma", "Verdana", "Segoe", sans-serif',
  borderRight: 'solid 1px #e8ebed',
}))

export interface GridColumn<T> {
  id: number | string
  title: string
  key?: keyof T
  maxWidth?: number
  width?: number
  component?: (rowData: T) => React.ReactNode
  headerComponent?: React.ReactNode
  getCellValue?: (rowData: T) => string | number | null
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  cellClassName?: (rowData: T) => string
  cellColor?: (rowData: T) => string
}

type Props<T> = {
  rows: T[]
  columns: GridColumn<T>[]
  getRowId: (row: T) => string | number
  className?: string
  onSelect?: (row: T) => void
  stickyHeader?: boolean
  maxHeight?: string | number
  noDataText?: string
}

export default function DataGrid<T>({
  rows,
  columns,
  getRowId,
  onSelect,
  stickyHeader = false,
  maxHeight = '80vh',
  className,
  noDataText = 'Нет данных',
}: Props<T>) {
  return (
    <div
      className={className || ''}
      style={{
        overflowY: 'auto',
        maxHeight,
        width: '100%',
        boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.6)',
      }}
    >
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        stickyHeader={stickyHeader}
      >
        <TableHead>
          <StyledTableRow>
            {rows.length > 0 &&
              columns.map((col) => (
                <StyledTableCell
                  key={col.id}
                  align={col.align}
                  sx={{ maxWidth: col.maxWidth ? col.maxWidth : undefined }}
                >
                  {col.headerComponent ? col.headerComponent : col.title}
                </StyledTableCell>
              ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <StyledTableRow
                key={getRowId(row)}
                onClick={() => onSelect && onSelect(row)}
                sx={{
                  cursor: onSelect ? 'pointer' : undefined,
                  '&:hover': {
                    backgroundColor: onSelect
                      ? (theme) => theme.palette.action.focus
                      : undefined,
                  },
                }}
              >
                {columns.map((col) => (
                  <StyledTableCell
                    key={col.id}
                    scope="row"
                    sx={{
                      maxWidth: col.maxWidth ? col.maxWidth : undefined,
                      backgroundColor: col.cellColor
                        ? col.cellColor(row)
                        : undefined,
                    }}
                    width={col.width ?? undefined}
                    align={col.align}
                    className={
                      col.cellClassName ? col.cellClassName(row) : undefined
                    }
                  >
                    {col.component ? (
                      col.component(row)
                    ) : (
                      <Typography fontSize="inherit">{`${
                        col.getCellValue
                          ? col.getCellValue(row) || ''
                          : col.key
                          ? row[col.key] || ''
                          : ''
                      }`}</Typography>
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell
                width="100%"
                sx={{
                  border: 'solid 1px #e8ebed',
                }}
              >
                <Typography
                  fontStyle="italic"
                  textAlign="center"
                  fontSize="inherit"
                >
                  {noDataText}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
