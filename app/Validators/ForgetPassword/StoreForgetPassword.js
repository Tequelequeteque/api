'use strict'

class ForgetPasswordStoreForgetPassword {
  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgetPasswordStoreForgetPassword
