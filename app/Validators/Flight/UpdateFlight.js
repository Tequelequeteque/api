'use strict'

class FlightUpdateFlight {
  get rules () {
    return {
      altitude: 'required|string',
      takeOff: 'required|date',
      landing: 'required|date',
      distanced: 'required|string',
      ascending: 'required|string',
      descendant: 'required|string',
      speed: 'required|string',
      sail: 'required|string',
      harness: 'required|string',
      comment: 'string'
    }
  }
}

module.exports = FlightUpdateFlight
