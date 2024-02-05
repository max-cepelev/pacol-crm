import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist<{ menu: boolean; toggleMenu: () => void }>(
    (set, get) => ({
      menu: true,
      toggleMenu() {
        set({ menu: !get().menu })
      },
    }),
    {
      name: 'crmSettings', // name of item in the storage (must be unique),
      // getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
)
