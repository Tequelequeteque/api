'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FieldsUsersSchema extends Schema {
  up () {
    this.table('users', table => {
      table.text('medicine')
      table.text('alergy')
      table.text('restrictions')
    })
  }

  down () {
    this.table('users', table => {
      table.dropColumn('medicine')
      table.dropColumn('alergy')
      table.dropColumn('restrictions')
    })
  }
}

module.exports = FieldsUsersSchema
