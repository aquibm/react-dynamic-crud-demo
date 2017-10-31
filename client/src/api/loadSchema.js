import axios from 'axios'

export function loadSchema(entityType = '') {
    if (!entityType) throw Error('No entity type provided')

    return axios
        .get(`http://localhost:8080/api/schema/${entityType}`)
        .then(resp => resp.data)
}
