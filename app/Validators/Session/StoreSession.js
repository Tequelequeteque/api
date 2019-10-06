'use strict'

class SessionStore {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|alphaNumeric|min:6'
    }
  }
}

module.exports = SessionStore
