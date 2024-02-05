import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import {
  deleteService,
  patchService,
  postService,
} from "../../../api/services";
import { Project, Prisma } from "../../../types";
import useNotification from "../useNotification";

export default function useProjectMutations() {
  const path = "/projects";
  const client = useQueryClient();
  const { successNotice, errorNotice } = useNotification();

  const { mutate: create, isLoading: isCreating } = useMutation(
    async (data: Prisma.ProjectUncheckedCreateInput) =>
      await postService<Project, Prisma.ProjectUncheckedCreateInput>({
        path,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["projects"]);
        successNotice("Создан");
      },
      onError(error: AxiosError) {
        errorNotice(error.message);
      },
    }
  );

  const { mutate: update, isLoading: isUpdating } = useMutation(
    async ({
      id,
      data,
    }: {
      id: number;
      data: Prisma.ProjectUncheckedCreateInput;
    }) =>
      await patchService<Project, Prisma.ProjectUncheckedCreateInput>({
        path: path + "/" + id,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["projects"]);
        client.invalidateQueries(["project"]);
        successNotice("Обновлен");
      },
      onError(error: AxiosError) {
        errorNotice(error.message);
      },
    }
  );

  const { mutate: remove, isLoading: isDeleting } = useMutation(
    async (id: number) =>
      await deleteService<Project>({
        path: `${path}/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["projects"]);
        successNotice("Удален");
      },
      onError(error: AxiosError) {
        errorNotice(error.message);
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
