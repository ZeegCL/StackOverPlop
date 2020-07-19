'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddMessageParentMessageColumnSchema extends Schema {
  up () {
    this.alter('messages', (table) => {
      table.integer('parent_message_id').unsigned().references('id').inTable('messages')
    })
  }

  down () {
    this.alter('messages', (table) => {
      table.dropColumn('parent_message_id')
    })
  }
}

module.exports = AddMessageParentMessageColumnSchema
