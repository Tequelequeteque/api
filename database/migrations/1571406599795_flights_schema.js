'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlightsSchema extends Schema {
  up () {
    this.create('flights', table => {
      table.increments().unsigned()
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('takeOff').notNullable()
      table.timestamp('landing').notNullable()
      table.string('distanced').notNullable()
      table.string('ascending').notNullable()
      table.string('descendant').notNullable()
      table.string('altitude').notNullable()
      table.string('speed').notNullable()
      table.string('sail').notNullable()
      table.string('harness').notNullable()
      table.text('comment')
      table.timestamps()
    })
  }

  down () {
    this.drop('flights')
  }
}

module.exports = FlightsSchema
