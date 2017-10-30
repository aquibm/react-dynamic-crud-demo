const express = require('express')
const router = express.Router()

// Controllers
const schemaController = require('./controllers/schema')

// Middleware

// Routes
router.get('/', (_, res) => res.send('Iz up'))

router.get('/schema/:entity', schemaController.get)

module.exports = router
