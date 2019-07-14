import { USER_LOGGED, USER_LOGOUT } from '../types/usersTypes'

export const userLoged = user => ({
  type: USER_LOGGED,
  payload: user
})

export const userLogout = () => ({
  type: USER_LOGOUT
})