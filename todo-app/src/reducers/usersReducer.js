import { USER_LOADING, USER_ERROR ,USER_LOGGED, USER_LOGOUT} from '../types/usersTypes'

const INITIAL_STATE = {
  user: {},
  error: null,
  isLoading: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, error: null, isLoading: false }
    case USER_LOGGED:
      return { ...state, error: null, isLoading: false, user: action.payload }
    case USER_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    case USER_LOGOUT:
      return { ...state, error: null, isLoading: false, user: {} }
    default:
      return state
  }
}