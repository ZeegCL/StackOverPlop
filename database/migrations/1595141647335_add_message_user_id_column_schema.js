'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddMessageUserIdColumnSchema extends Schema {
  up () {
    this.alter('messages', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.alter('messages', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddMessageUserIdColumnSchema
