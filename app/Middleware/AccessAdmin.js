'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AccessAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    const { admin } = auth.user

    if (!admin) {
      return response
        .status(403)
        .send({ unauthorized: { message: 'You dont have authorized!' } })
    }

    // call next to advance the request
    await next()
  }
}

module.exports = AccessAdmin
