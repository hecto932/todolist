import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../helpers'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import rootSaga from '../sagas'
import config from '../config'

// COMPONENTS
import Layout from './Layout'

// PAGES
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

const client = new ApolloClient({
  uri: config.apiUrl
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  )
}
