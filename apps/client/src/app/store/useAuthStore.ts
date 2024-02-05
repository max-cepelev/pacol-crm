import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { Distributor, User } from '../../types'

interface AuthStore {
  user: (User & { distributor: Distributor }) | null
  setUser: (user: (User & { distributor: Distributor }) | null) => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  setUser(user) {
    set({ user })
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('auth', useAuthStore)
}
