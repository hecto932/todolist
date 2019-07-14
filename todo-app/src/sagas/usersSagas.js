import { takeEvery, put, call } from 'redux-saga/effects'
import { USER_LOGIN } from '../types/usersTypes';

function* userLogin (payload) {
  console.log('userLogin')
  console.log(payload)
}

export default [
  takeEvery(USER_LOGIN, userLogin),
]
