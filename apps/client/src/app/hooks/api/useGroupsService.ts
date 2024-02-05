import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getService, patchService, postService } from "../../../api/services";
import { Group, Prisma } from "../../../types";

export default function useGroupsService({
  distributorId,
}: {
  distributorId?: number | null;
}) {
  const client = useQueryClient();
  const { data: groups = [], isLoading } = useQuery(
    ["groups", distributorId],
    async () =>
      await getService<Group[]>({
        path: "/groups",
        params: { distributorId: distributorId || undefined },
      }),
    {
      staleTime: 600000,
    }
  );

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.GroupUncheckedCreateInput) =>
      await postService<Group, Prisma.GroupUncheckedCreateInput>({
        path: "/groups",
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["groups"]);
      },
    }
  );

  const { mutate: update, isLoading: isUpdating } = useMutation(
    async ({ id, name }: { id: number; name: string }) =>
      await patchService<Group, { name: string }>({
        path: `/groups/${id}`,
        data: { name },
      }),
    {
      onSuccess() {
        client.invalidateQueries(["groups"]);
      },
    }
  );

  return {
    groups,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
  };
}
