import { all } from 'redux-saga/effects'

import tasksSagas from './tasksSagas'
import usersSagas from './usersSagas'

export default function* rootSaga() {
  yield all([...tasksSagas, ...usersSagas])
}