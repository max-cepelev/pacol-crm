import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

export const useModalStore = create<{
  infoModal: string | null
  setInfoModal: (message: string) => void
  closeInfoModal: () => void
}>((set, get) => ({
  infoModal: null,
  setInfoModal(message) {
    set({ infoModal: message })
  },
  closeInfoModal() {
    set({ infoModal: null })
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('dialogs', useModalStore)
}
