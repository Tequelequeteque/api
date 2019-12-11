'use strict';

class UserStore {
  // essa função faz validar todos os campos, o default é false caso apague
  // a função ele vai validar o campo e o primeiro que falhar ele retornar a mensagem
  get validateAll () {
    return true
  }

  // regras de validações
  // mais informações da regras https://indicative.adonisjs.com/validations/master/array
  // documentação meio falha, quando tenho duvida pergunto no grupo do discord do adonisjs
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      cpf: 'required|string|unique:users|min:11|max:11',
      phone: 'required|string|min:12|max:15',
      password: 'required|alphaNumeric|min:6',
      passwordConfirmation: 'required|same:password',
      medicine: 'string',
      alergy: 'string',
      restrictions: 'string',
      redirect: 'required|url'
    }
  }

  // aqui é onde você customiza a mensagens
  // qualquer duvida doc: https://adonisjs.com/docs/4.1/validator#_custom_error_messages
  get messages () {
    return {
      'email.unique': 'This email is already registered.',
      'cpf.unique': 'This cpf is already registered.'
    }
  }
}

module.exports = UserStore
