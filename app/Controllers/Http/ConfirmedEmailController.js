'use strict'

const crypto = require('crypto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Params')} Params */

const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')
const mailUsername = Env.get('MAIL_USERNAME')
const appName = Env.get('APP_NAME')

/**
 * Resourceful controller for interacting with confirmedemails
 */
class ConfirmedEmailController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    return response.status(501).send()
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = auth.user
    const redirect = request.input('redirect')

    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at = new Date()
    user.email_confirmed = false

    this.sendMail({ ...user.toJSON(), redirect })
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    return response.status(501).send()
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response }) {
    const token = request.input('token')
    const user = await User.findByOrFail('token', token)

    user.token = null
    user.token_created_at = null
    user.email_confirmed = true

    await user.save()
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
    return response.status(501).send()
  }

  sendMail ({ name, email, token, redirect }) {
    Mail.send(
      ['emails.confirmed_email.edge'],
      {
        name,
        email,
        token,
        appName,
        link: `${redirect}?token=${token}`
      },
      message =>
        message
          .to(email)
          .from(mailUsername, `Equipe ${appName}`)
          .subject('Confirmação de email.')
    )
  }
}

module.exports = ConfirmedEmailController
