'use strict';

class UserStore {
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      cpf: 'required|string|unique:users|min:11|max:11',
      phone: 'required|string|min:12|max:15',
      password: 'required|alphaNumeric|min:6',
      passwordConfirmation: 'required|same:password',
      redirect: 'required|url'
    }
  }
}

module.exports = UserStore
