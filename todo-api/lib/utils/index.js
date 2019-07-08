'use strict'

const debug = require('debug')('todo:api:utils')
const fs = require('fs')
const { gql } = require('apollo-server-express')

function loadTypeDefs(schemaPath) {
  debug(`loading schema -> ${schemaPath}`)
  const schemaFile = fs.readFileSync(schemaPath, 'utf8');
  return gql(schemaFile)
}

module.exports = {
  loadTypeDefs
}