import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from '../../store/useAuthStore'
import { API_URL } from '../../../api'
import { Distributor, Prisma, User } from '../../../types'
import { useModalStore } from '../../store/useModalStore'
import useNotification from '../useNotification'

export default function useAuthService() {
  let navigate = useNavigate()
  const { successNotice, errorNotice } = useNotification()
  const setUser = useAuthStore((store) => store.setUser)
  const setInfoModal = useModalStore((store) => store.setInfoModal)

  let location = useLocation()

  const {
    mutate: check,
    isLoading: checkLoading,
    isSuccess: isCheckSuccess,
  } = useMutation(
    async () =>
      await axios.get<{
        token: string
        user: User & { distributor: Distributor }
      }>(`${API_URL}/auth/refresh`, { withCredentials: true }),
    {
      onSuccess(response) {
        setUser(response.data.user)
        localStorage.setItem('token', response.data.token)
        navigate(location)
      },
      onError(error) {
        console.log(error)
        navigate('/login')
      },
    }
  )

  const { mutate: registration, isLoading: registrationLoading } = useMutation(
    async (data: Prisma.UserUncheckedCreateInput) =>
      await axios.post<{ message: string }>(`${API_URL}/auth/signup`, data, {
        withCredentials: true,
      }),
    {
      onSuccess(response) {
        setInfoModal(
          'Ваша учетная запись успешно зарегистрирована и находится на модерации. Когда ваша учетная запись активируется, вам придет уведомление на указанный email'
        )
        navigate('/no-activate')
        successNotice(response.data.message)
      },
      onError(error: AxiosError<{ message: string; statusCode: number }>) {
        errorNotice(error.response?.data.message ?? 'Ошибка при регистрации')
      },
    }
  )

  const { mutate: login, isLoading: loginLoading } = useMutation(
    async ({ email, password }: { email: string; password: string }) =>
      await axios.post<{
        token: string
        user: User & { distributor: Distributor }
      }>(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      ),
    {
      onSuccess(response) {
        setUser(response.data.user)
        localStorage.setItem('token', response.data.token)
        navigate('/')
      },
      onError(error: AxiosError<{ message: string; statusCode: number }>) {
        errorNotice(error.response?.data.message ?? 'Ошибка входа')
      },
    }
  )

  const { mutate: logout } = useMutation(
    async () =>
      await axios.post<{ token: string; user: User }>(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      ),
    {
      onSuccess() {
        setUser(null)
        localStorage.removeItem('token')
        navigate('/login')
      },
    }
  )

  const loading = registrationLoading || loginLoading

  return {
    check,
    registration,
    login,
    logout,
    loading,
    checkLoading,
    isCheckSuccess,
  }
}
