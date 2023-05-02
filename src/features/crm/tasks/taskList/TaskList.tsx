import React, { FC } from 'react'

import { Board } from '../board/Board'
import { Box } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Task } from '../task/Task'
import { TaskStatuses } from 'common/enums'
import { TaskType } from '../tasks.api'
import { tasksThunks } from '../tasks.reducer'
import { useActions } from 'common/hooks'

type PropsType = {
  taskList: TaskType[]
}

export const BoardTitles = {
  NEW: 'New tasks',
  INPROGRESS: 'Tasks in progress',
  COMPLETED: 'Completed tasks',
}

export const TaskList: FC<PropsType> = ({ taskList }) => {
  const { removeTask, updateTask } = useActions(tasksThunks)

  const newTasks = taskList
    .filter((t) => t.status === TaskStatuses.New)
    .map((t) => (
      <Task
        key={t.id}
        task={t}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    ))

  const tasksInProgress = taskList
    .filter((t) => t.status === TaskStatuses.InProgress)
    .map((t) => (
      <Task
        key={t.id}
        task={t}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    ))

  const completedTasks = taskList
    .filter((t) => t.status === TaskStatuses.Completed)
    .map((t) => (
      <Task
        key={t.id}
        task={t}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    ))
  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        display='grid'
        gridTemplateColumns='1fr 1fr 1fr'
        alignItems='stretch'
        height='86vh'
        overflow={'hidden'}
      >
        <Box>
          <Board title={BoardTitles.NEW} onDrop={updateTask}>
            {newTasks}
          </Board>
        </Box>
        <Box>
          <Board title={BoardTitles.INPROGRESS} onDrop={updateTask}>
            {tasksInProgress}
          </Board>
        </Box>
        <Box>
          <Board title={BoardTitles.COMPLETED} onDrop={updateTask}>
            {completedTasks}
          </Board>
        </Box>
      </Box>
    </DndProvider>
  )
}

// DnD types
export const ItemTypes = {
  TASK: 'task',
}
