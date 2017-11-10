const knex = require('knex')(require('../knexfile'))
const Promise = require('bluebird')

exports.get = entityId => {
    if (!entityId) return Promise.reject('No entity ID specified')

    return knex('entity')
        .join('data', 'entity.id', 'data.entity_id')
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

    return knex.transaction(trx => {
        return knex('entity')
            .transacting(trx)
            .returning('id')
            .insert({
                type: entity.type,
            })
            .then(resp => {
                const entityId = resp[0]
                const keys = Object.keys(entity.fields)
                const data = keys.map(key => ({
                    entity_id: entityId,
                    key,
                    value: entity.fields[key],
                }))

                return knex('data')
                    .transacting(trx)
                    .insert(data)
                    .then(() => {
                        return entityId
                    })
            })
            .then(entityId => {
                trx.commit()
                return entityId
            })
            .catch(err => {
                trx.rollback()
                throw err
            })
    })
}
