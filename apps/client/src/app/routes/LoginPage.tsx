import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CardWrapper } from '../components/ui/CardWrapper'
import ColumnWrapper from '../components/ui/ColumnWrapper'
import useAuthService from '../hooks/api/useAuthService'
import { useModalStore } from '../store/useModalStore'

export default function LoginPage() {
  const setInfoModal = useModalStore((store) => store.setInfoModal)
  const { login, registration } = useAuthService()
  const [reg, setReg] = useState(false)
  const [error, setError] = useState({ email: false, password: false })
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    description: '',
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    if (name === 'password' && value.length < 33) {
      setValues((prev) => ({ ...prev, password: value }))
    }

    if (name === 'phone' && !isNaN(Number(value)) && value.length < 12) {
      setValues((prev) => ({ ...prev, phone: value }))
    }

    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleAccept = () => {
    const { email, password, name, phone, description } = values

    if (email && password) {
      reg
        ? registration({
            email,
            password,
            name,
            phone,
            description,
            salt: 'dfdf',
          })
        : login({ email, password })
    }
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CardWrapper sx={{ minWidth: 350 }}>
        <TextField
          label="email"
          type="email"
          value={values.email}
          name="email"
          onChange={handleInput}
        />
        <TextField
          label="Пароль"
          type="password"
          value={values.password}
          name="password"
          onChange={handleInput}
        />
        {reg ? (
          <>
            <TextField
              label="Ваше имя"
              value={values.name}
              name="name"
              placeholder="Представьтесь"
              onChange={handleInput}
            />
            <TextField
              placeholder="+7 (999) 999-99-99"
              label="Телефон"
              value={values.phone}
              name="phone"
              onChange={handleInput}
            />
            <TextField
              label="Организация и должность"
              value={values.description}
              name="description"
              placeholder="Организация и должность"
              onChange={handleInput}
            />
          </>
        ) : null}
        <ColumnWrapper>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAccept}
            onKeyDown={(e) => console.log(e)}
            color="primary"
            disabled={error.email || error.password}
          >
            {reg ? 'Зарегистрироваться' : 'Войти'}
          </Button>
          {reg ? (
            <Typography textAlign="center" variant="caption">
              Уже зарегистрированы?{' '}
              <span
                style={{ color: '#0075ff', cursor: 'pointer' }}
                onClick={() => setReg(false)}
              >
                Войдите.
              </span>
            </Typography>
          ) : (
            <Typography textAlign="center" variant="caption">
              Нет учетной записи?{' '}
              <span
                style={{ color: '#0075ff', cursor: 'pointer' }}
                onClick={() => setReg(true)}
              >
                Зарегистрируйтесь.
              </span>
            </Typography>
          )}
        </ColumnWrapper>
      </CardWrapper>
    </Box>
  )
}
