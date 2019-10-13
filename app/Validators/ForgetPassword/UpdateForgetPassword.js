'use strict'

class ForgetPasswordUpdateForgetPassword {
  get rules () {
    return {
      token: 'required',
      password: 'required|alphaNumeric|min:6',
      passwordConfirmation: 'required|same:password'
    }
  }
}

module.exports = ForgetPasswordUpdateForgetPassword
