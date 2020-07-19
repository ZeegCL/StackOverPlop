'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    thread () {
        return this.belongsTo('App/Models/Thread')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Message
