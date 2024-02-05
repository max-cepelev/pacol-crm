import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

import { Prisma, Task, TaskStatus } from "../../../types";
import { useAuthStore } from "../../store/useAuthStore";

const SERVER_URL = "http://localhost:7000";

export const useTasksSocket = (roomId: number | string) => {
  const [tasks, setTasks] = useState<(TaskStatus & { tasks: Task[] })[]>([]);
  const user = useAuthStore((store) => store.user);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (user) {
      socketRef.current = io(SERVER_URL, {
        query: { userId: user.id, distributorId: user.distributorId },
      });

      socketRef.current.emit("tasks");

      socketRef.current.on("tasks", (tasks) => {
        setTasks(tasks);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user]);

  const updateTasks = (tasks: Prisma.TaskUncheckedCreateInput[]) => {
    if (socketRef.current) {
      socketRef.current.emit("tasks:update", tasks);
    }
  };

  return { tasks, updateTasks };
};
