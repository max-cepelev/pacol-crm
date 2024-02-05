import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {
  deleteService,
  getService,
  patchService,
  postService,
} from '../../../api/services'
import { Prisma, Task, TaskStatus } from '../../../types'
import { useAuthStore } from '../../store/useAuthStore'
import useNotification from '../useNotification'

export type TaskStatusesResponse = (TaskStatus & {
  tasks: (Task & { user: { name: string }; client: { name: string } })[]
})[]

export default function useTasksServices() {
  const client = useQueryClient()
  const { successNotice } = useNotification()
  const user = useAuthStore((store) => store.user)

  const { data: taskStatuses = [], isLoading: isTasksLoading } = useQuery(
    ['taskStatuses'],
    async () =>
      await getService<TaskStatusesResponse>({
        path: '/task-statuses',
        params: {
          distributorId: user?.distributorId,
        },
      }),
    {
      refetchInterval: 10000,
    }
  )

  const { mutate: createTaskStatus, isLoading: isStatusCreating } = useMutation(
    async (data: Prisma.TaskStatusUncheckedCreateInput) =>
      await postService<TaskStatus, Prisma.TaskStatusUncheckedCreateInput>({
        path: '/task-statuses',
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['taskStatuses'])
        successNotice('Создан')
      },
    }
  )

  const { mutate: createTask, isLoading: isTaskCreating } = useMutation(
    async (data: Prisma.TaskUncheckedCreateInput) =>
      await postService<Task, Prisma.TaskUncheckedCreateInput>({
        path: '/tasks',
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['taskStatuses'])
        successNotice('Задача создана')
      },
    }
  )

  const { mutate: updateTaskStatus, isLoading: isTaskStatusUpdating } =
    useMutation(
      async ({ id, name }: { id: number; name: string }) =>
        await patchService<TaskStatus, { name: string }>({
          path: `/task-statuses/${id}`,
          data: { name },
        }),
      {
        onSuccess() {
          client.invalidateQueries(['taskStatuses'])
        },
      }
    )

  const { mutate: updateTasks, isLoading: isTasksUpdating } = useMutation(
    async (data: Prisma.TaskUncheckedCreateInput[]) =>
      await patchService<Task[], Prisma.TaskUncheckedCreateInput[]>({
        path: '/tasks/updateMany',
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['taskStatuses'])
      },
    }
  )

  const { mutate: deleteTask, isLoading: isTaskDeleting } = useMutation(
    async (id: number) =>
      await deleteService<Task>({
        path: `/tasks/${id}`,
      }),
    {
      onSuccess() {
        client.invalidateQueries(['taskStatuses'])
        successNotice('Удалена')
      },
    }
  )

  const { mutate: deleteTaskStatus, isLoading: isTaskStatusDeleting } =
    useMutation(
      async (id: number) =>
        await deleteService<Task>({
          path: `/task-statuses/${id}`,
        }),
      {
        onSuccess() {
          client.invalidateQueries(['taskStatuses'])
          successNotice('статус удален')
        },
      }
    )

  return {
    taskStatuses,
    isTasksLoading,
    createTaskStatus,
    isStatusCreating,
    createTask,
    isTaskCreating,
    updateTaskStatus,
    isTaskStatusUpdating,
    updateTasks,
    isTasksUpdating,
    deleteTask,
    isTaskDeleting,
    deleteTaskStatus,
    isTaskStatusDeleting,
  }
}
