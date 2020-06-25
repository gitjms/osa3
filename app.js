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
app.use(express.static('build'))
app.use(express.json())

app.use('/api/people', peopleRouter)
app.use('/api', infoRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.custom_morgan)

module.exports = app
