'use strict'

const crypto = require('crypto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Params')} Params */

const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')
const appName = Env.get('APP_NAME')
const mailUsername = Env.get('MAIL_USERNAME')

class ForgetPasswordController {
  /**
   * Show a list of all sessions.
   * GET sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    return response.status(501).send()
  }

  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const redirect = request.input('redirect')
    const email = request.input('email')
    let user = await User.findByOrFail('email', email)

    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at = new Date()

    await user.save()
    user = user.toJSON()
    this.sendMail({ ...user, redirect })
  }

  /**
   * Display a single session.
   * GET sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    return response.status(501).send()
  }

  /**
   * Update session details.
   * PUT or PATCH sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response }) {
    const { token, password } = request.all()
    const user = await User.findByOrFail('token', token)

    user.password = password
    user.token = null
    user.token_created_at = null

    await user.save()
  }

  /**
   * Delete a session with id.
   * DELETE sessions/:id
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
      ['emails.forget_password.edge'],
      {
        name,
        email,
        token,
        link: `${redirect}?token=${token}`
      },
      message =>
        message
          .to(email)
          .from(mailUsername, `Equipe ${appName}`)
          .subject('Recuperação de senha.')
    )
  }
}

module.exports = ForgetPasswordController
