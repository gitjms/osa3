const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (request, response) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        const result = {
          num: persons.length,
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
        console.log('error in info.js')
        // response.status(404).end()
      }
    })
    .catch((error) => {
      console.log('error getting info:', error.message)
      response.status(404).end()
    })

})

module.exports = infoRouter