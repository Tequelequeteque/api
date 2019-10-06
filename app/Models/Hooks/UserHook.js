'use strict'

const UserHook = (exports = module.exports = {})

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

UserHook.hashPassword = async userInstance => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}
