'use strict'

const MongoLib = require('./mongo')

class TaskService {
  constructor (options) {
    this.collection = 'tasks'
    this.mongoDB = new MongoLib(options)
  }

  insertMany (dataArray) {
    return this.mongoDB.insertMany(this.collection, dataArray)
  }

  async getById(id) {
    const task = await this.mongoDB.get(this.collection, id)
    return task || {}
  }

  async getAll (queryParams) {
    const query = queryParams || {}
    const tasks = await this.mongoDB.getAll(this.collection, query)

    return tasks || []
  }

  async create(data) {
    const task = await this.mongoDB.create(this.collection, data)
    return task
  }

  async update(taskId, data) {
    const task = await this.mongoDB.update(this.collection, taskId, data)
    return task
  }

  async delete (taskId) {
    const task = await this.mongoDB.delete(this.collection, taskId)
    return task
  }
}

module.exports = TaskService
