import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  deleteService,
  getService,
  patchService,
  postService,
} from "../../../api/services";
import { Client, Prisma } from "../../../types";
import useNotification from "../useNotification";

export default function useClientMutations() {
  const path = "/clients";
  const client = useQueryClient();
  const { successNotice } = useNotification();

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.ClientUncheckedCreateInput) =>
      await postService<Client, Prisma.ClientUncheckedCreateInput>({
        path,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["clients"]);
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
      data: Prisma.ClientUncheckedCreateInput;
    }) =>
      await patchService<Client, Prisma.ClientUncheckedCreateInput>({
        path: path + "/" + id,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["clients"]);
        client.invalidateQueries(["client"]);
        successNotice("Обновлен");
      },
    }
  );

  const { mutate: remove, isLoading: isDeleting } = useMutation(
    async (id: number) =>
      await deleteService<Client>({
        path: `${path}/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["clients"]);
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
