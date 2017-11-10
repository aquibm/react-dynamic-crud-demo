const express = require('express')
const router = express.Router()

// Controllers
const schemaController = require('./controllers/schema')
const entityController = require('./controllers/entity')

// Middleware

// Routes
router.get('/', (_, res) => res.send('Iz up'))

router.get('/schema/:entity', schemaController.get)

router.post('/entity', entityController.post)

module.exports = router
