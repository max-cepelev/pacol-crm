import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  deleteService,
  getService,
  patchService,
  postService,
} from "../../../api/services";
import { Task, Prisma } from "../../../types";
import useNotification from "../useNotification";

export default function useTaskMutations() {
  const path = "/tasks";
  const client = useQueryClient();
  const { successNotice } = useNotification();

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.TaskUncheckedCreateInput) =>
      await postService<Task, Prisma.TaskUncheckedCreateInput>({
        path,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["taskStatuses"]);
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
      data: Prisma.TaskUncheckedCreateInput;
    }) =>
      await patchService<Task, Prisma.TaskUncheckedCreateInput>({
        path: path + "/" + id,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["taskStatuses"]);
        client.invalidateQueries(["task"]);
        successNotice("Обновлен");
      },
    }
  );

  const { mutate: updateMany, isLoading: isUpdatingMany } = useMutation(
    async ({ data }: { data: Prisma.TaskUncheckedCreateInput[] }) =>
      await patchService<Task[], Prisma.TaskUncheckedCreateInput[]>({
        path: path + "/updateMany",
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["taskStatuses"]);
      },
    }
  );

  const { mutate: remove, isLoading: isDeleting } = useMutation(
    async (id: number) =>
      await deleteService<Task>({
        path: `${path}/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["taskStatuses"]);
        successNotice("Удален");
      },
    }
  );

  return {
    create,
    update,
    remove,
    updateMany,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
