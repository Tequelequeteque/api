'use strict'

class UserUpdate {
  get rules () {
    return {
      email: 'email',
      name: 'string',
      phone: 'string|min:12|max:15',
      password: 'required',
      newPassword: 'alphaNumeric|min:6',
      newPasswordConfirmation: 'requiredIf:newPassword|same:newPassword',
      redirect: 'required|url'
    }
  }
}

module.exports = UserUpdate
