'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddThreadFkSchema extends Schema {
  up () {
    this.alter('threads', (table) => {
      table.integer('thread_category_id').unsigned().references('id').inTable('thread_categories')
    })
  }

  down () {
    this.alter('threads', (table) => {
      table.dropColumn('thread_category_id')
    })
  }
}

module.exports = AddThreadFkSchema
