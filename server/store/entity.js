const knex = require('knex')(require('../knexfile'))
const Promise = require('bluebird')

exports.get = entityId => {
    if (!entityId) return Promise.reject('No entity ID specified')

    return knex('entity')
        .join('data', 'entity.id', 'data.entity_id')
        .where('entity.id', entityId)
        .then(rows => {
            if (rows.length < 1) return rows
            const fields = rows.reduce(
                (fields, row) => (fields = { ...fields, [row.key]: row.value }),
                {},
            )

            return {
                type: rows[0].type,
                fields,
            }
        })
}

exports.create = entity => {
    if (!entity) return Promise.reject('No entity specified')
    let newEntityId

    return knex
        .transaction(trx => {
            return knex('entity')
                .transacting(trx)
                .returning('id')
                .insert({
                    type: entity.type,
                })
                .then(resp => {
                    newEntityId = resp[0]
                    const keys = Object.keys(entity.fields)
                    const data = keys.map(key => ({
                        entity_id: newEntityId,
                        key,
                        value: entity.fields[key],
                    }))

                    return knex('data')
                        .transacting(trx)
                        .insert(data)
                })
                .then(() => trx.commit())
                .catch(err => {
                    trx.rollback()
                    throw err
                })
        })
        .then(() => newEntityId)
}

exports.delete = entityId => {
    if (!entityId) return Promise.reject('No entity ID specified')

    return knex.transaction(trx => {
        return knex('data')
            .transacting(trx)
            .where('entity_id', entityId)
            .delete()
            .then(() => {
                return knex('entity')
                    .transacting(trx)
                    .where('id', entityId)
                    .delete()
            })
            .then(() => trx.commit())
            .catch(() => {
                trx.rollback()
                throw err
            })
    })
}
