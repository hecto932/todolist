'use strict'

require('dotenv').config()

const production = process.env.NODE_ENV === 'production'
const development = process.env.NODE_ENV === 'development'

module.exports = {
  appName: 'todo-app',
  production,
  development,
  server: {
    auth: false,
  },
  graphql: {
    playground: true,
    tracing: true,
    introspection: false,
    depth: 2,
    complexity: 1000,
  },
  auth: {
    secret: process.env.AUTH_JWT_SECRET || 'todo-secret' // HERE AUTHENTICATION SECRET
  },
  bcrypt: {
    saltRounds: 10
  },
  db: {
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME
  }
}
