const express = require('express')
const router = express.Router()

// Controllers
const schemaController = require('./controllers/schema')
const entityController = require('./controllers/entity')

// Middleware

// Routes
router.get('/', (_, res) => res.send('Iz up'))

router.get('/schema/:entity', schemaController.get)

router.get('/entity/list/:type', entityController.list)
router.get('/entity/:id', entityController.get)
router.post('/entity', entityController.post)
router.put('/entity/:id', entityController.put)
router.delete('/entity/:id', entityController.delete)

module.exports = router
