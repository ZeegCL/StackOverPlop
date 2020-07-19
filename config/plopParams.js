'use strict'

const Env = use('Env')

module.exports = {
    fromEmail: Env.get('FROM_EMAIL')
}
