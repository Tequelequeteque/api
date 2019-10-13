'use strict'

class ForgetPasswordStoreForgetPassword {
  get rules () {
    return {
      email: 'required|email',
      redirect: 'required|url'
    }
  }
}

module.exports = ForgetPasswordStoreForgetPassword
