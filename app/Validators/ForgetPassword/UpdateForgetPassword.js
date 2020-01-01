'use strict'

class ForgetPasswordUpdateForgetPassword {
  get rules() {
    return {
      token: 'required',
      password: 'required|alphaNumeric|min:6',
      passwordConfirmation: 'required|same:password'
    }
  }

  // aqui é onde você customiza a mensagens
  // qualquer duvida doc: https://adonisjs.com/docs/4.1/validator#_custom_error_messages
  get messages() {
    return {
      'token.required': 'Token obrigatório.',
      'passwordConfirmation.same': 'Senha e confirmação de senha não conferem'
    }
  }
}

module.exports = ForgetPasswordUpdateForgetPassword
