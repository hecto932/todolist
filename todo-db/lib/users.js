'use strict'

const MongoLib = require('./mongo')

class UserService {
  constructor (options) {
    this.collection = 'users';
    this.mongoDB = new MongoLib(options)
  }

  async getAll(queryParams) {
    const query = queryParams || {}
    const users = await this.mongoDB.getAll(this.collection, query)

    return users || []
  }
}

module.exports = UserService
