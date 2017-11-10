exports.up = function(knex, Promise) {
    return knex.schema.createTable('data', t => {
        t.increments('id').primary()
        t.integer('entity_id').unsigned()
        t.foreign('entity_id').references('entity.id')
        t.string('key').notNullable()
        t.string('value')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('data')
}
