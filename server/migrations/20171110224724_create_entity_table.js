exports.up = function(knex, Promise) {
    return knex.schema.createTable('entity', t => {
        t.increments('id').primary()
        t.string('type').notNullable()
        t.timestamps(false, true)
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('entity')
}
