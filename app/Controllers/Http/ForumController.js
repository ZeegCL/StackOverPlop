'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with forums
 */
class ForumController {
  /**
   * Show a list of all forums.
   * GET forums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const Message = use('App/Models/Message')
    const messages = await Message.query().where('parent_message_id', null).paginate(1, 20)
    return view.render('forum.index', { messages: messages.toJson() })
  }

  /**
   * Render a form to be used for creating a new forum.
   * GET forums/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render('forum.new')
  }

  /**
   * Create/save a new forum.
   * POST forums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const Message = use('App/Models/Message')
    const messageData = request.only(['content', 'parent_message_id'])
    const message = await Message.create(messageData)
    return view.render('forum.thread', { message: message.toJson() })
  }

  /**
   * Display a single forum.
   * GET forums/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const Message = use('App/Models/Message')
    const message = await Message.find(params.id)
    return view.render('forum.thread.show', { message: message.toJson() })
  }

  /**
   * Render a form to update an existing forum.
   * GET forums/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const Message = use('App/Models/Message')
    const message = await Message.find(params.id)
    return view.render('forum.thread.edit', { message: message.toJson() })
  }

  /**
   * Update forum details.
   * PUT or PATCH forums/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const Message = use('App/Models/Message')
    const message = await Message.find(params.id)
    message.merge({ content: request.content })
    return view.render('forum.message_updated')
  }

  /**
   * Delete a forum with id.
   * DELETE forums/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const Message = use('App/Models/Message')
    const message = Message.find(params.id)
    await message.delete()
    return view.render('forum.message_deleted')
  }
}

module.exports = ForumController
