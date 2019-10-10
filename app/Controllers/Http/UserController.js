'use strict'

const crypto = require('crypto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Params')} Params */

const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const appName = Env.get('APP_NAME')
const User = use('App/Models/User')
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
   */
  async store ({ request }) {
    const redirect = request.input('redirect')
    const data = request.only(['name', 'email', 'password'])

    data.token = crypto.randomBytes(10).toString('hex')
    data.token_created_at = new Date()

    let user = await User.create(data)
    user = user.toJSON()

    this.sendMail({ ...user, redirect })

    delete user.token
    delete user.token_created_at
    delete user.password
    delete user.email_confirmed

    return user
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
  async update ({ request, response, auth }) {
    let user = auth.user
    const { name, email, password, newPassword, redirect } = request.all()

    const confirmedPassword = await Hash.verify(password, user.password)
    console.log(confirmedPassword)
    if (!confirmedPassword) {
      return response
        .status(401)
        .send({ error: { message: 'Password doesnt match!' } })
    }

    const anotherUser = await User.findBy('email', email)
    if (user.id !== anotherUser.id) {
      return response
        .status(400)
        .send({ error: { message: 'Email used by another user!' } })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.password = newPassword || password
    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at = new Date()
    user.email_confirmed = false

    user.save()
    user = user.toJSON()

    this.sendMail({ ...user, redirect })

    delete user.token
    delete user.token_created_at
    delete user.password
    delete user.email_confirmed

    return user
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
          .from(`noreply@${appName}.com`, `Equipe ${appName}`)
          .subject('Confirmação de email.')
    )
  }
}

module.exports = UserController
