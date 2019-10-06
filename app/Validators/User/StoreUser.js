'use strict'

class UserStoreUser {
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed|alphaNumeric|min:6'
    }
  }
}

module.exports = UserStoreUser
