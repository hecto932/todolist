'use strict'

const debug = require('debug')('todo:api:user-resolver')
const config = require('../config')
const { TaskService } = require('todo-db')

module.exports = {
  getTasks: async () => {
    try {
      const taskService = new TaskService(config.db)
      const tasks = await taskService.getAll()
      return tasks
    } catch (err) {
      debug(`Error: ${err.message}`)
    }
  }
}