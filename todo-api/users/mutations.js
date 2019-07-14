'use strict'

const debug = require('debug')('todo:api:user-mutation')
const { AuthenticationError } = require('apollo-server-express')
const { UserService } = require('todo-db')
const config = require('../config')
const { sign } = require('../lib/auth')

module.exports = {
  userLogin: async (root, args) => {
    debug(`userLogin`)
    debug(args)
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

      return {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userToken: token
      }
    } catch (err) {
      debug(`Error -> ${err.message}`)
      return err
    }
  }
}
