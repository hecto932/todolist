import { TASKS_CREATE, TASKS_CHANGE_STATUS } from '../types/tasksTypes'

export const createTask = task => ({
  type: TASKS_CREATE,
  payload: task
})

export const changeStatus = task => ({
  type: TASKS_CHANGE_STATUS,
  payload: task
})