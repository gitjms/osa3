const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('*', (req, res) => {
  let path = req.params['0'].substring(1)
  res.sendFile(`${__dirname}/build/${path}`)
  // res.sendFile(`${__dirname}/build/index.html`)
})

infoRouter.get('/', (request, response, next) => {
  Person.find({})
    .then(people => {
      if (people) {
        const result = {
          num: people.length,
          date: new Date(),
        }
        const results = '<title>Phonebook Info Page</title>'
        + '<center><br /><strong style=\'font-size: 25px;\'>'
        + 'Phonebook has info for ' + result.num + ' people'
        + '</strong><br /><br />' + result.date + '<br /><br />'
        + '<div className=\'col-auto\' align=\'center\'>'
        + '<form action=\'/\' method=\'GET\'>'
        + '<button type=\'submit\' onclick=\'/\'>Back</button>'
        + '</form></div><br /><hr />'
        + '<em>Phonebook app, Full Stack Web Development</em><br />'
        + '<em>University of Helsinki 2020</em>'
        + '</center>'
        response.send(results)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = infoRouter