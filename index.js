const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.get('*', (req, res) => {
  // let path = req.params['0'].substring(1)
  res.sendFile(`${__dirname}/build/index.html`)
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
