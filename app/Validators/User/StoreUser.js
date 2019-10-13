'use strict'

class UserStoreUser {
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|alphaNumeric|min:6',
      passwordConfirmation: 'required|same:password',
      redirect: 'required|url'
    }
  }
}

module.exports = UserStoreUser
