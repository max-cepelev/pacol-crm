import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  deleteService,
  getService,
  patchService,
  postService,
} from "../../../api/services";
import { Distributor, Prisma } from "../../../types";
import useNotification from "../useNotification";

export default function useDistributorMutations() {
  const path = "/distributors";
  const client = useQueryClient();
  const { successNotice } = useNotification();

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.DistributorUncheckedCreateInput) =>
      await postService<Distributor, Prisma.DistributorUncheckedCreateInput>({
        path,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["distributors"]);
        successNotice("Создан");
      },
    }
  );

  const { mutate: update, isLoading: isUpdating } = useMutation(
    async ({
      id,
      data,
    }: {
      id: number;
      data: Prisma.DistributorUncheckedCreateInput;
    }) =>
      await patchService<Distributor, Prisma.DistributorUncheckedCreateInput>({
        path: path + "/" + id,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["distributors"]);
        client.invalidateQueries(["distributor"]);
        successNotice("Обновлен");
      },
    }
  );

  const { mutate: remove, isLoading: isDeleting } = useMutation(
    async (id: number) =>
      await deleteService<Distributor>({
        path: `${path}/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["distributors"]);
        successNotice("Удален");
      },
    }
  );

  return {
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
