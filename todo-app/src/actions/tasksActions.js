import { TASKS_CREATE, TASKS_CHANGE_STATUS, TASKS_CREATED, TASKS_FETCHED } from '../types/tasksTypes'

export const createTask = task => ({
  type: TASKS_CREATE,
  payload: task
})

export const createdTask = task => ({
  type: TASKS_CREATED,
  payload: task
})

export const changeStatus = task => ({
  type: TASKS_CHANGE_STATUS,
  payload: task
})

export const taskFetched = tasks => ({
  type: TASKS_FETCHED,
  payload: tasks
})