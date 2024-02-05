import { Paper, styled } from '@mui/material'

export const CardWrapper = styled('div')(() => ({
  padding: 12,
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.6)',
  position: 'relative',
}))
