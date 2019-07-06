'use strict'

const debug = require('debug')('todo:app-server');
const path = require('path')
const fs = require('fs')
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

// RESOLVERS
const taskResolvers = require('./tasks/resolvers')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

const schema = fs.readFileSync(path.join(__dirname, 'tasks', 'schema.graphql'), 'utf-8')
const typeDefs = gql(schema)
const resolvers = {
  ...taskResolvers
}

app.use(bodyParser.json())

const api = new ApolloServer({
  typeDefs,
  resolvers,
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



