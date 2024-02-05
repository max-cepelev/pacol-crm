import { styled } from '@mui/material'
import React from 'react'

export const Wrapper = styled('div')(() => ({
  padding: 12,
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.6)',
  position: 'relative',
  minHeight: 70,
  paddingBottom: 3,
  rowGap: '5px',
}))

export default function TaskWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Wrapper
      sx={{
        minHeight: 70,
        paddingBottom: 3,
        rowGap: '5px',
      }}
    >
      {children}
    </Wrapper>
  )
}
