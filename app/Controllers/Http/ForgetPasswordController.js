'use strict'

const crypto = require('crypto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Params')} Params */

const User = use('App/Models/User')
const Mail = use('Mail')
const appName = use('Env').get('APP_NAME', 'AdonisJs')

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
    const email = request.input('email')
    const user = await User.findByOrFail('email', email)

    user.forget_password_token = crypto.randomBytes(10).toString('hex')
    user.forget_password_token_created_at = new Date()

    await user.save()

    await Mail.send(
      ['emails.forget_password.edge'],
      {
        email,
        forget_password_token: user.forget_password_token,
        link: `${request.input('redirect_url')}?forget_password_token=${
          user.forget_password_token
        }`
      },
      message =>
        message
          .to(user.email)
          .from(`noreply@${appName}.com`, `Equipe ${appName}`)
          .subject('Recuperação de senha.')
    )
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
  async update ({ params, request, response }) {}

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
}

module.exports = ForgetPasswordController
