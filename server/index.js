const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./router')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
