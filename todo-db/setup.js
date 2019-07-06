'use strict'

const debug = require('debug')('todo-db:setup')
const chalk = require('chalk')
const inquirer = require('inquirer')
const minimist = require('minimist')
const config = require('./config')
const MongoLib = require('./lib/mongo')

const prompt = inquirer.createPromptModule()
const args = minimist(process.argv)
const Mongo = new MongoLib(config)

// Documentos
const TaskService = require('./lib/tasks')

// Mocks
const tasks = require('./utils/mocks/tasks')

async function setup () {
  try {
    if (!args.yes) {
      const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: `This operation will destroy the database, can you `
      }])

      if (!answer.setup) {
        return console.log(chalk.red(`Nothing happend :)`))
      }
    }

    // DROP THE DATABSE
    const dropDatabaseResult = await Mongo.dropDatabase();
    console.log(chalk.green(`DropDatabaseResult ${dropDatabaseResult}`))

    // CREATING TASKS
    const taskService = new TaskService(config)
    const taskInsertManyResult = await taskService.insertMany(tasks)
    console.log(chalk.green(`Created ${Object.keys(taskInsertManyResult).length} tasks`))
    process.exit(0)
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`))
    process.exit(1)
  }
}

setup()