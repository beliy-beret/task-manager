import { TaskPriorities, TaskStatuses } from 'common/enums'
import {
  TasksStateType,
  tasksReducer,
  tasksThunks,
} from 'features/crm/tasks/tasks.reducer'

let startState: TasksStateType = []
beforeEach(() => {
  startState = [
    {
      id: '1',
      title: 'CSS',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      description: '',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriorities.Low,
    },
    {
      id: '2',
      title: 'JS',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId1',
      description: '',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriorities.Low,
    },
    {
      id: '3',
      title: 'React',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      description: '',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriorities.Low,
    },
  ]
})

test('correct task should be deleted from correct array', () => {
  const args = { taskId: '2', todolistId: 'todolistId2' }
  const action = tasksThunks.removeTask.fulfilled(args, 'requestId', args)

  const endState = tasksReducer(startState, action)

  expect(endState.length).toBe(startState.length - 1)
})

test('correct task should be added to correct array', () => {
  //const action = addTaskAC("juce", "todolistId2");

  const task = {
    todoListId: 'todolistId1',
    title: 'juce',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: 'id exists',
  }

  const action = tasksThunks.addTask.fulfilled({ task }, 'requestId', {
    title: task.title,
    todolistId: task.todoListId,
  })

  const endState = tasksReducer(startState, action)

  expect(endState.length).toBe(startState.length + 1)
  expect(endState[0].id).toEqual(task.id)
  expect(endState[0].title).toEqual(task.title)
  expect(endState[0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const args = {
    taskId: '2',
    domainModel: { status: TaskStatuses.New },
    todolistId: 'todolistId1',
  }
  const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args)

  const endState = tasksReducer(startState, action)

  expect(endState[1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const args = {
    taskId: '2',
    domainModel: { title: 'yogurt' },
    todolistId: 'todolistId1',
  }
  const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args)

  const endState = tasksReducer(startState, action)

  expect(endState[1].title).toEqual(args.domainModel.title)
})
