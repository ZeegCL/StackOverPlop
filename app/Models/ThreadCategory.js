'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ThreadCategory extends Model {
    threads () {
        this.hasMany('App/Models/Thread')
    }
}

module.exports = ThreadCategory
