import { TASKS_CREATED, TASKS_FETCHED, TASKS_ERROR, TASKS_LOADING } from '../types/tasksTypes'

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  data: []
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case TASKS_CREATED:
      const { data } = state
      data.unshift(action.payload)
      return { ...state, data, error: null, isLoading: false }
    case TASKS_FETCHED:
      return { ...state, data: action.payload, error: null, isLoading: false }
    case TASKS_LOADING:
      return { ...state, isLoading: true }
    case TASKS_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}