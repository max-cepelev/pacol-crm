import React, { useEffect, useState } from 'react'
import RowWrapper from '../../components/ui/RowWrapper'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import { Box } from '@mui/material'
import AddColumnButton from './AddColumnButton'
import Column from './Column'
import TaskWrapper from './TaskWrapper'

type ColumnBase = {
  id: string | number
  name: string
}

type Column<T> = ColumnBase & { [key: string]: T[] }

interface Props<T> {
  tasksKey: string
  columns: Column<T>[]
  onAddTask: (columnId: string | number) => void
  onAddColumn: (name: string) => void
  onChangeColumnName: (name: string) => void
  taskComponent: React.ReactNode
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void
}

export default function CanbanBoard<T>({
  columns,
  onAddTask,
  onChangeColumnName,
  onAddColumn,
  taskComponent,
  onDragEnd,
}: Props<T>) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RowWrapper>
        {columns.map((column) => (
          <Box key={column.id} width={'auto'}>
            <Droppable droppableId={column.id.toString()}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column
                    onEdit={onChangeColumnName}
                    column={column}
                    onAdd={onAddTask}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TaskWrapper>{taskComponent}</TaskWrapper>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
        ))}
        <AddColumnButton onAdd={onAddColumn} />
      </RowWrapper>
    </DragDropContext>
  )
}
