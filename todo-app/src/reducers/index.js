import { combineReducers } from 'redux'

import tasksReducer from './tasksReducer'
import usersReducer from './usersReducer'

export default combineReducers({
  tasks: tasksReducer,
  user: usersReducer
})