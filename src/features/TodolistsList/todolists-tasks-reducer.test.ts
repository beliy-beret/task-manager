import { TasksStateType, tasksReducer } from "./tasksSlice";
import { TodolistDomainType, todoActions } from "./todoSlice";

import { TodolistType } from "api/todolists-api";
import { todoReducer } from "./todoSlice";

// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];

//     let todolist: TodolistType = {
//         title: 'new todolist',
//         id: 'any id',
//         addedDate: '',
//         order: 0
//     }

//     const action = todoActions.addTodo({todo: todolist});

//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todoReducer(startTodolistsState, action)

//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;

//     expect(idFromTasks).toBe(action.todolist.id);
//     expect(idFromTodolists).toBe(action.todolist.id);
// });
