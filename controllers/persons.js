const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
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
        + '<em>University of Helsinki 2020</em><br />'
        + '<a href=\'https://icons8.com/icon/aggz2cCtJYrP/phone-contact\'>Phone Contact icon by Icons8</a>'
        + '</center>'
        response.send(results)
        response.json(persons.map(person => person.toJSON()))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedAndFormattedPerson => {
      response.json(updatedAndFormattedPerson)
    })
    .catch(error => next(error))
})

// personsRouter.get('/info', (request, response) => {
//   Person.find({})
//     .then(persons => {
//       if (persons) {
//         const result = {
//           num: persons.length,
//           date: new Date(),
//         }
//         const results = '<title>Phonebook Info Page</title>'
//         + '<center><br /><strong style=\'font-size: 25px;\'>'
//         + 'Phonebook has info for ' + result.num + ' people'
//         + '</strong><br /><br />' + result.date + '<br /><br />'
//         + '<div className=\'col-auto\' align=\'center\'>'
//         + '<form action=\'/\' method=\'GET\'>'
//         + '<button type=\'submit\' onclick=\'/\'>Back</button>'
//         + '</form></div><br /><hr />'
//         + '<em>Phonebook app, Full Stack Web Development</em><br />'
//         + '<em>University of Helsinki 2020</em><br />'
//         + '<a href=\'https://icons8.com/icon/aggz2cCtJYrP/phone-contact\'>Phone Contact icon by Icons8</a>'
//         + '</center>'
//         response.send(results)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => {
//       console.log(error)
//       response.status(404).end()
//     })
// })

module.exports = personsRouter