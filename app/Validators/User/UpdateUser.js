'use strict'

class UserUpdate {
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

module.exports = UserUpdate
