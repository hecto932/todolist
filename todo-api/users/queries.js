'use strict'

const debug = require('debug')('todo:api:user-queries')
const { AuthenticationError } = require('apollo-server-express')
const { UserService } = require('todo-db')
const { sign } = require('../lib/auth')
const config = require('../config')

module.exports = {
  userAuthenticate: async (root, args, context) => {
    debug(`userAuthenticate`)

    try {
      const userService = new UserService(config.db)
      const user = await userService.find(args)

      if (!user) {
        throw new AuthenticationError('Unauthorized')
      }

      const token = await sign(
        {
          userId: user._id,
          fullName: user.name,
          email: user.email
        },
        config.auth.secret,
        { expiresIn: '1h' }
      )

      return { token }
    } catch (err) {
      debug(`Error -> ${err.message}`)
      return err
    }
  },
  getUsers: async (root, args, { isAuth, userData }) => {
    debug(`getUsers`)
    if (!isAuth) throw new AuthenticationError(`Invalid token...`)

    try {
      const userService = new UserService(config.db)
      const users = userService.getAll({})
      return users
    } catch (err) {
      debug(`Error -> ${err.message}`)
      return err
    }
  }
}