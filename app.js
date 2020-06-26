const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const peopleRouter = require('./controllers/people')
const infoRouter = require('./controllers/info')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect( config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
// app.use(express.static('build'))
app.use(express.static('${__dirname}/build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.custom_morgan)

app.get('*', (req, res) => {
  // let path = req.params['0'].substring(1)
  res.sendFile(`${__dirname}/build/index.html`)
})

app.use('/api/people', peopleRouter)
app.use('/info', infoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
