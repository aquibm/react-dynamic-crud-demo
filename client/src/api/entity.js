import axios from 'axios'

export const createEntity = entity => {
    if (!entity) throw Error('No entity provided')
    return axios.post('http://localhost:8080/api/entity', entity)
}
