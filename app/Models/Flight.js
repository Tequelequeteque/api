'use strict'

const Moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Flight extends Model {
  static get computed () {
    return ['duration']
  }

  getDuration ({ takeOff, landing }) {
    const start = Moment(takeOff)
    const end = Moment(landing)

    const duration = Moment.duration(end.diff(start))
    const hours = parseInt(duration.asHours(), 10)
    const minutes = duration.minutes()

    return `${hours < 10 ? `0${hours}` : hours}h:${
      minutes < 10 ? `0${minutes}` : minutes
    }m`
  }

  user () {
    return this.belongsTo('App/Models/User', 'userId', 'id')
  }
}

module.exports = Flight
