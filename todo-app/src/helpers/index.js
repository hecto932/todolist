import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import config from '../config'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      localStorage && localStorage.getItem(`${config.appName}-userToken`) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from:  props.location }
          }}
        />
      )
    )}
  />
)

export const getAuthToken = () => {
  if (localStorage && localStorage.getItem('authToken')) {
    return localStorage.getItem('authToken')
  }

  return false
}

export const setUserLogin = (userData) => {
  Object.keys(userData).forEach((key) => {
    localStorage.setItem(`${config.appName}-${key}`, userData[key])
  })
}

export const logout = () => {
  const userData = { userId: '', userName: '', userEmail: '', userToken: '' }
  Object.keys(userData).forEach((key) => {
    localStorage.removeItem(`${config.appName}-${key}`)
  })
}