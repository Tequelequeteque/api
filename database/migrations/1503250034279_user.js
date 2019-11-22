'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments().unsigned()
      table.string('name').notNullable()
      table
        .string('email')
        .notNullable()
        .unique()
      table
        .string('cpf')
        .notNullable()
        .unique()
      table.string('phone').notNullable()
      table.string('password').notNullable()
      table.string('token')
      table.timestamp('token_created_at')
      table.boolean('email_confirmed').defaultTo(false)
      table.enu('rule', ['admin', 'user']).defaultTo('user')
      table.boolean('payment').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
