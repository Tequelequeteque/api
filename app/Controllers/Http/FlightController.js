'use strict'

const Flight = use('App/Models/Flight')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with flights
 */
class FlightController {
  /**
   * Show a list of all flights.
   * GET flights
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const userId = auth.user.id

    const flights = await Flight.query()
      .where({ userId })
      .fetch()

    return flights
  }

  /**
   * Create/save a new flight.
   * POST flights
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const userId = auth.user.id

    const flights = await Flight.query()
      .where({ userId })
      .getCount()

    if (flights >= 20) {
      return response
        .status(400)
        .send({ error: { message: 'User has  20 flights limited' } })
    }

    const data = request.only([
      'altitude',
      'takeOff',
      'landing',
      'distanced',
      'ascending',
      'descendant',
      'speed',
      'sail',
      'harness',
      'comment'
    ])

    let flight = await Flight.create({ ...data, userId })

    flight = flight.toJSON()
    delete flight.userId

    return response.status(201).send(flight)
  }

  /**
   * Display a single flight.
   * GET flights/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    const userId = auth.user.id
    const id = params.id

    let flight = await Flight.query()
      .where({ id, userId })
      .first()

    if (!flight) {
      return response.status(404).send()
    }

    flight = flight.toJSON()
    delete flight.userId
    return flight
  }

  /**
   * Update flight details.
   * PUT or PATCH flights/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const userId = auth.user.id
    const id = params.id

    let flight = await Flight.query()
      .where({ id, userId })
      .first()

    if (!flight) {
      return response.status(400).send()
    }

    const data = request.only([
      'altitude',
      'takeOff',
      'landing',
      'distanced',
      'ascending',
      'descendant',
      'speed',
      'sail',
      'harness',
      'comment'
    ])

    flight.merge(data)
    await flight.save()

    flight = flight.toJSON()
    delete flight.userId

    return flight
  }

  /**
   * Delete a flight with id.
   * DELETE flights/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    const userId = auth.user.id
    const id = params.id

    const flight = await Flight.query()
      .where({ id, userId })
      .first()

    if (!flight) {
      return response.status(204).send()
    }

    await flight.delete()
    return response.status(204).send()
  }
}

module.exports = FlightController
