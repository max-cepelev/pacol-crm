import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'
import { User } from '../../types'

export const useAuthStore = create<{
  user: User | null
  setUser: (user: User | null) => void
}>((set, get) => ({
  user: null,
  setUser(user) {
    set({ user })
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('auth', useAuthStore)
}
