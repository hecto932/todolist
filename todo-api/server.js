'use strict'

const debug = require('debug')('todo:server');
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const { getUser, verify } = require('./lib/auth')
const { createComplexityLimitRule } = require('graphql-validation-complexity')
const depthLimit = require('graphql-depth-limit')
const { ApolloServer } = require('apollo-server-express')

const resolvers = require('./resolvers')
const { typeDefs } = require('./schema')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

const api = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    let userData = null
    let isAuth = false

    if (config.server.auth) {
      // get the user token from the headers
      const token = req.headers.authentication || ''

      try {
        const tokenPayload = await verify(token, config.auth.secret)
        userData = await getUser(tokenPayload)
        isAuth = false
        debug(`isAuth -> ${isAuth}`)
        debug(`tokenPayload -> `, tokenPayload)
      } catch (err) {
        debug(`Error -> ${err.message}`)
        userData = null
        isAuth = false
      }
    }

    return { isAuth, userData }
  },
  validationRules: [
    depthLimit(config.graphql.depth),
    createComplexityLimitRule(config.graphql.complexity, {
      onCost (cost) {
        debug(`Current query cost ${cost}`)
      },
      formatErrorMessage(cost) {
        return `current query with cost ${cost} exceeds complexity limit of ${config.graphql.complexity}`
      }
    })
  ], // Plugins or middlewares
  playground: true,
  tracing: true
})

api.applyMiddleware({
  app,
  path: '/api'
})

server.listen(port, () => {
  debug(`Server listening on http://localhost:${port}`)
})



