import { USER_LOGGED, USER_LOGOUT, USER_ERROR } from '../types/usersTypes'

export const userLoged = user => ({
  type: USER_LOGGED,
  payload: user
})

export const userLogout = () => ({
  type: USER_LOGOUT
})

export const userError = error => ({
  type: USER_ERROR,
  payload: error
})