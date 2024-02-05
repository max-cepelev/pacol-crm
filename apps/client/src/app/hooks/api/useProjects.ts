import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getService } from "../../../api/services";
import { Project, ProjectStatus } from "../../../types";

interface Params {
  distributorId?: number | null;
  clientId?: number | null;
  statusId?: number | null;
}

export interface ProjectsResponse extends Project {
  status: ProjectStatus;
  distributor: { name: string };
  client: { name: string };
}

export default function useProjects({
  distributorId,
  statusId,
  clientId,
}: Params) {
  const {
    data: projects = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    ["projects", distributorId, clientId, statusId],
    async () =>
      await getService<ProjectsResponse[]>({
        path: "/projects",
        params: {
          statusId: statusId || undefined,
          distributorId: distributorId || undefined,
          clientId: clientId || undefined,
        },
      }),
    { staleTime: 60000 }
  );
  return {
    projects,
    loading,
    error,
  };
}
