const entity = require('../store/entity')

exports.post = (req, res) => {
    const { type } = req.body
    if (!type) return res.send('Bad type')

    entity
        .create(type)
        .then(rows => {
            return res.send(rows)
        })
        .catch(err => {
            return res.send(err)
        })
}
