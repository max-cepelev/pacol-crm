import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { Prisma } from '../../types'

export const useEditorStore = create<{
  distributor: Prisma.DistributorUncheckedCreateInput | null
  setDistributor: (data: Prisma.DistributorUncheckedCreateInput | null) => void
}>((set, get) => ({
  distributor: null,
  setDistributor(distributor) {
    set({ distributor })
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('editor', useEditorStore)
}
