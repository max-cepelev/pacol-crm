import { mdiAccountCircle } from '@mdi/js'
import Icon from '@mdi/react'
import {
  AccountCircle,
  Home,
  Menu,
  Notifications,
  Settings,
} from '@mui/icons-material'
import { Breadcrumbs, IconButton, styled, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthService from '../../hooks/api/useAuthService'
import { useAuthStore } from '../../store/useAuthStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import RowWrapper from './RowWrapper'

const ToolbarWrapper = styled('div')(() => ({
  gridArea: 'toolbar',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  minHeight: 'auto',
  padding: 0,
  paddingRight: '15px',
  zIndex: 1100,
  left: 'auto',
  right: 0,
  boxSizing: 'border-box',
  borderRadius: '0.75rem',
  height: '60px',
}))

export default function Toolbar() {
  const route = useLocation().pathname.split('/').slice(1)
  const { logout } = useAuthService()
  const toggleMenu = useSettingsStore((store) => store.toggleMenu)
  let navigate = useNavigate()
  const routes = route.slice(0, -1)
  const user = useAuthStore((store) => store.user)
  return (
    <ToolbarWrapper>
      <div>
        <Breadcrumbs
          sx={{
            '& .MuiBreadcrumbs-separator': {},
          }}
        >
          <IconButton onClick={toggleMenu}>
            <Menu />
          </IconButton>
          {routes.map((el) => (
            <Link to={`/${el}`} key={el}>
              <Typography
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color={'dark'}
                sx={{ lineHeight: 0 }}
              >
                {el}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      </div>
      <RowWrapper>
        {user && (
          <Typography
            textAlign="center"
            paddingTop="10px"
            lineHeight="100%"
            variant="subtitle1"
          >
            {user.email}
          </Typography>
        )}
        <IconButton onClick={() => logout()} size="small" disableRipple>
          <Icon path={mdiAccountCircle} size="24px" />
        </IconButton>
        <IconButton size="small" disableRipple>
          <Settings />
        </IconButton>
        <IconButton
          size="small"
          disableRipple
          aria-controls="notification-menu"
          aria-haspopup="true"
        >
          <Notifications />
        </IconButton>
      </RowWrapper>
    </ToolbarWrapper>
  )
}
