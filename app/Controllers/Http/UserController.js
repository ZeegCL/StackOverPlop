'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const User = use('App/Models.User')
    const users = User.all().paginate(1, 20)
    return view.render('admin.users.index', { users: users.toJson() })
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.users.create')
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['email', 'username', 'password'])
    const user = await User.create(data)

    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from(Config.get('plopParams.fromEmail'))
        .subject('Welcome to StackOverPlop')
    })

    return view.render('user.welcome', { username: data.username })
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const User = use('App/Models/User')
    const user = await User.find(params.id)
    return view.render('admin.users.show', { user: user.toJson() })
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const User = use('App/Models/User')
    const user = await User.find(params.id)
    return view.render('admin.users.edit', { user: user.toJson() })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const Message = use('App/Models/Message')
    const message = await Message.find(params.id)
    message.merge({ content: request.content })
    return view.render('forum.message_updated')
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const User = use('App/Models/User')
    const user = User.find(params.id)
    await user.delete()
    return view.render('forum.user_deleted')
  }
}

module.exports = UserController
