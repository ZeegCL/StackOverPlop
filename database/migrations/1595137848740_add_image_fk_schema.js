'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddImageFkSchema extends Schema {
  up () {
    this.alter('images', (table) => {
      table.integer('message_id').unsigned().references('id').inTable('messages')
    })
  }

  down () {
    this.alter('images', (table) => {
      table.dropColumn('message_id')
    })
  }
}

module.exports = AddImageFkSchema
