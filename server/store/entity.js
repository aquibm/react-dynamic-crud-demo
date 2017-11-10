const knex = require('knex')(require('../knexfile'))

exports.create = type => {
    if (!type) Promise.reject('No type specified')

    return knex('entity')
        .returning('id')
        .insert({
            type,
        })
}
