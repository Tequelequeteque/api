'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')

    this.addHook('afterSave', 'UserHook.confirmedEmail')
  }

  static get hidden () {
    return ['password']
  }
}

module.exports = User
