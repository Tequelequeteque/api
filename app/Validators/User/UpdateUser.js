'use strict'

class UserUpdateUser {
  get rules () {
    return {
      email: 'email',
      name: 'string',
      password: 'required',
      newPassword: 'alphaNumeric|min:6',
      newPasswordConfirmation: 'requiredIf:newPassword|same:newPassword',
      redirect: 'required|url'
    }
  }
}

module.exports = UserUpdateUser
