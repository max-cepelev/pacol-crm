import { Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../store/useSettingsStore'

const StyledDrawer = styled('div')(() => ({
  boxShadow: '0rem 1.25rem 1.6875rem 0rem rgb(0 0 0 / 5%)',
  backgroundColor: '#181824',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1200,
  height: '100%',
  gridArea: 'drawer',
  overflowY: 'auto',
  rowGap: 10,
}))

const Logo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 10,
}))

export default function Drawer({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const menu = useSettingsStore((store) => store.menu)
  return (
    <StyledDrawer>
      <Logo onClick={() => navigate('/')}>
        <img
          style={{ maxWidth: '40px', maxHeight: '40px' }}
          src="/icons/logo.png"
          alt="logo"
        />
        {menu && (
          <Typography
            variant="h5"
            color="#FFFFFF"
            textAlign="center"
            fontWeight="bold"
            paddingLeft={2}
          >
            Паколь-CRM
          </Typography>
        )}
      </Logo>
      {children}
    </StyledDrawer>
  )
}
