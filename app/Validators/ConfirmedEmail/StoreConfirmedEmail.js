'use strict'

class ConfirmedEmailStoreConfirmedEmail {
  get rules () {
    return {
      redirect: 'required|url'
    }
  }
}

module.exports = ConfirmedEmailStoreConfirmedEmail
