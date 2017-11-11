import axios from 'axios'
import { endpoint } from './endpoint'

export const loadSchema = entityType => {
    if (!entityType) throw Error('No entity type provided')
    return axios.get(endpoint(`/schema/${entityType}`)).then(resp => resp.data)
}

export const getEntityList = entityType => {
    if (!entityType) throw Error('No entity type provided')

    return axios
        .get(endpoint(`/entity/list/${entityType}`))
        .then(resp => resp.data)
}

export const getEntity = entityId => {
    if (!entityId) throw Error('No entity ID provided')
    return axios.get(endpoint(`/entity/${entityId}`)).then(resp => resp.data)
}

export const createEntity = entity => {
    if (!entity) throw Error('No entity provided')
    return axios.post(endpoint('/entity'), entity).then(resp => resp.data)
}

export const updateEntity = entity => {
    if (!entity) throw Error('No entity provided')
    return axios.put(endpoint(`/entity/${entity.id}`), entity)
}

export const deleteEntity = entityId => {
    if (!entityId) throw Error('No entity ID provided')
    return axios.delete(endpoint(`/entity/${entityId}`))
}
