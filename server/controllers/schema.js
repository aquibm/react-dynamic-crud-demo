const fs = require('fs')
const yaml = require('js-yaml')

exports.get = (req, res) => {
    const { entity } = req.params
    const path = `./schema/${entity}.yml`
    const schema = yaml.safeLoad(fs.readFileSync(path))

    res.send(schema)
}
