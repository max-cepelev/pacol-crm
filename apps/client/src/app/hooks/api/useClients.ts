import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getService } from "../../../api/services";
import { Client } from "../../../types";

interface Params {
  distributorId?: number | null;
  groupId?: number | null;
}

export interface ClientsResponse extends Client {
  distributor: { name: string };
  group: { name: string };
}

export default function useClients({ distributorId, groupId }: Params) {
  const {
    data: clients = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    ["clients", distributorId, groupId],
    async () =>
      await getService<ClientsResponse[]>({
        path: "/clients",
        params: {
          distributorId: distributorId || undefined,
          groupId: groupId || undefined,
        },
      }),
    { staleTime: 60000 }
  );
  return {
    clients,
    loading,
    error,
  };
}
