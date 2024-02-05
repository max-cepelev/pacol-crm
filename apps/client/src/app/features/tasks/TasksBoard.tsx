import React, { useEffect, useState } from 'react'
import RowWrapper from '../../components/ui/RowWrapper'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import useTasksServices, {
  TaskStatusesResponse,
} from '../../hooks/api/useTasksServices'
import AddStatusButton from '../../components/AddStatusButton'
import TaskCard from './TaskCard'
import TaskColumn from './TaskColumn'
import { Box } from '@mui/material'
import { Prisma } from '../../../types'
import TaskEditDialog from './TaskEditDialog'
import { useAuthStore } from '../../store/useAuthStore'

export default function TasksBoard() {
  // const { tasks: data, updateTasks } = useTasks("kanban");
  const {
    taskStatuses,
    updateTasks,
    createTaskStatus,
    updateTaskStatus,
    createTask,
  } = useTasksServices()
  const [state, setState] = useState<TaskStatusesResponse>([])
  const user = useAuthStore((store) => store.user)
  const [taskState, setTaskState] =
    useState<Prisma.TaskUncheckedCreateInput | null>(null)

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const fromColumn = state.find((column) => column.id == +source.droppableId)
    const toColumn = state.find(
      (column) => column.id == +destination.droppableId
    )
    const task = fromColumn?.tasks[source.index]
    if (task && toColumn) {
      const newTasks = toColumn.tasks.filter((task) => task.id !== +draggableId)
      newTasks.splice(destination.index, 0, {
        ...task,
        statusId: +destination.droppableId,
        updatedAt: new Date(),
      })
      setState((prev) =>
        prev.map((status) => {
          if (status.id == toColumn.id) {
            return { ...status, tasks: newTasks }
          }
          if (status.id == fromColumn.id) {
            return {
              ...status,
              tasks: status.tasks.filter((task) => task.id !== +draggableId),
            }
          }
          return status
        })
      )
      updateTasks(newTasks)
    }
  }

  useEffect(() => {
    taskStatuses.length > 0 && setState(taskStatuses)
  }, [taskStatuses])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RowWrapper>
        {state.map((column) => (
          <Box key={column.id} width={'auto'}>
            <Droppable droppableId={column.id.toString()}>
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskColumn
                    onEditName={(name) =>
                      updateTaskStatus({ id: column.id, name })
                    }
                    column={column}
                    onAddTask={(statusId) =>
                      user &&
                      setTaskState({
                        id: undefined,
                        title: '',
                        dateStarted: new Date(),
                        dateEnded: undefined,
                        content: '',
                        statusId,
                        distributorId: user.distributorId,
                        clientId: undefined,
                        projectId: undefined,
                        userId: user.id,
                        contactId: undefined,
                      })
                    }
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TaskCard task={task} onEdit={setTaskState} />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  </TaskColumn>
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
        <AddStatusButton onAdd={(name) => createTaskStatus({ name })} />
        <TaskEditDialog
          task={taskState}
          onClose={() => setTaskState(null)}
          open={Boolean(taskState)}
          onSave={(task) => (task.id ? updateTasks([task]) : createTask(task))}
        />
      </RowWrapper>
    </DragDropContext>
  )
}
