const knex = require('knex')(require('../knexfile'))
const Promise = require('bluebird')
const { groupBy, map } = require('lodash')

exports.list = type => {
    if (!type) return Promise.reject('No type specified')

    return knex('entity')
        .join('data', 'entity.id', 'data.entity_id')
        .where('entity.type', type)
        .then(rows => {
            const entityRows = groupBy(rows, row => row.entity_id)
            const entities = map(entityRows, rows => {
                const fields = rows.reduce(
                    (fields, row) =>
                        (fields = { ...fields, [row.key]: row.value }),
                    {},
                )

                return {
                    type: rows[0].type,
                    fields,
                }
            })

            return entities
        })
}

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
                    const data = mapFieldsIntoData(newEntityId, entity.fields)

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

exports.update = (entityId, fields) => {
    if (!entityId) return Promise.reject('No entity ID specified')
    if (!fields) return Promise.reject('No fields to update')

    const data = mapFieldsIntoData(entityId, fields)
    const updates = data.map(row =>
        knex('data')
            .where('entity_id', row.entity_id)
            .andWhere('key', row.key)
            .update(row)
            .toString(),
    )

    return knex.transaction(trx => {
        const promises = updates.map(update => trx.raw(update))

        return Promise.all(promises)
            .then(() => trx.commit())
            .catch(err => {
                trx.rollback()
                throw err
            })
    })
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

function mapFieldsIntoData(entityId, fields) {
    const keys = Object.keys(fields)
    return keys.map(key => ({
        entity_id: entityId,
        key,
        value: fields[key],
    }))
}
