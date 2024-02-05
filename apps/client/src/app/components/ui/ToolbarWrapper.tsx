import { Paper, styled } from '@mui/material'

const ToolbarWrapper = styled('div')(() => ({
  padding: 8,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  columnGap: 10,
  backgroundColor: 'Menu',
  boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.6)',
}))

export default ToolbarWrapper
