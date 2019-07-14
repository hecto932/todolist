import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import {
  TASKS_INIT_FETCH,
  TASKS_FETCHED,
  TASKS_LOADING,
  TASKS_ERROR,
  TASKS_CREATE,
  TASKS_CHANGE_STATUS
} from '../types/tasksTypes'
import config from '../config'
import Axios from 'axios'

// WORKERS
function* fetchTasks() {
  yield put({ type: TASKS_LOADING })

  try {
    const {
      data: {
        data: { getTasks }
      }
    } = yield call(Axios, {
      url: config.apiUrl,
      method: 'POST',
      data: {
        query: `
        {
          getTasks {
            _id
            name
            done
            createdAt
            updatedAt
          }
        }
      `
      }
    })
    console.log(getTasks)
    yield put({ type: TASKS_FETCHED, payload: getTasks })
  } catch (err) {
    console.log(`Error -> ${err.message}`)
    yield put({ type: TASKS_ERROR, payload: err.message })
  }
}

function* createTask(action) {
  yield put({ type: TASKS_LOADING })
  try {
    const { data } = yield call(Axios, {
      url: config.apiUrl,
      method: 'POST',
      data: {
        query: `
          mutation {
            createTask(input: { name: "${action.payload.name}" }) {
              _id
              name
            }
          }
      `
      }
    })
    yield put({ type: TASKS_INIT_FETCH })
  } catch (err) {
    console.log(`Error -> ${err.message}`)
    yield put({ type: TASKS_ERROR, payload: err.message })
  }
}

function* changeStatus(action) {
  console.log(action, state)
  const { payload } = action
  yield put({ type: TASKS_LOADING })
  try {
    const { data } = yield call(Axios, {
      url: config.apiUrl,
      method: 'POST',
      data: {
        query: `
          mutation {
            editTask(_id: "${payload._id}", input: { done: ${payload.done} }) {
              _id
              name
              done
            }
          }
      `
      }
    })
    console.log(data)
    yield put({ type: TASKS_INIT_FETCH })
  } catch (err) {
    console.log(`Error -> ${err.message}`)
    yield put({ type: TASKS_ERROR, payload: err.message })
  }
}

export default [
  takeLatest(TASKS_INIT_FETCH, fetchTasks),
  takeEvery(TASKS_CREATE, createTask),
  takeEvery(TASKS_CHANGE_STATUS, changeStatus)
]
