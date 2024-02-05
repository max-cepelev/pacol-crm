import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export interface SelectorsStore {
  groupId: number | null;
  clientId: number | null;
  distributorId: number | null;
  projectStatusId: number | null;
}

interface SelectorsStoreActions {
  setGroupId: (id: number | null) => void;
  setClientId: (id: number | null) => void;
  setDistributorId: (id: number | null) => void;
  setProjectStatusId: (id: number | null) => void;
}

export const useSelectorsStore = create<SelectorsStore & SelectorsStoreActions>(
  (set, get) => ({
    groupId: null,
    clientId: null,
    distributorId: null,
    projectStatusId: null,
    setGroupId(groupId) {
      set({ groupId });
    },
    setClientId(clientId) {
      set({ clientId });
    },
    setDistributorId(distributorId) {
      set({ distributorId });
    },
    setProjectStatusId(projectStatusId) {
      set({ projectStatusId });
    },
  })
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("selectors", useSelectorsStore);
}
