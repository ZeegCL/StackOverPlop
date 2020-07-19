'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
    messages () {
        return this.hasMany('App/Models/Message')
    }

    category () {
        return this.belongsTo('App/Models/ThreadCategory')
    }
}

module.exports = Thread
