const entityStore = require('../store/entity')

exports.list = (req, res) => {
    const { type } = req.params

    entityStore
        .list(type)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err))
}

exports.get = (req, res) => {
    const { id } = req.params

    entityStore
        .get(id)
        .then(result => {
            if (!result || Array.isArray(result))
                return res.status(404).send('No such entity')

            res.send(result)
        })
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
    const { id } = req.params
    const { fields } = req.body

    // TODO(AM): Re-implement the same entity validation logic as the client.
    entityStore
        .update(id, fields)
        .then(resp => res.send(resp))
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

exports.delete = (req, res) => {
    const { id } = req.params

    entityStore
        .delete(id)
        .then(resp => {
            console.log(resp)
            res.send(resp)
        })
        .catch(err => res.status(500).send(err))
}
