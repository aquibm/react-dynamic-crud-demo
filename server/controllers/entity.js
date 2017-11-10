const entityStore = require('../store/entity')

exports.list = (req, res) => {
    res.send('Not implemented.')
}

exports.get = (req, res) => {
    const { id } = req.params

    entityStore
        .get(id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err))
}

exports.post = (req, res) => {
    const entity = req.body

    // TODO(AM): Re-implement the same entity validation logic as the client.
    entityStore
        .create(entity)
        .then(resp => res.send(resp))
        .catch(err => res.status(500).send(err))
}

exports.put = (req, res) => {
    res.send('Not implemented.')
}

exports.delete = (req, res) => {
    res.send('Not implemented.')
}
