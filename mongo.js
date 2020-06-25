const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length>5) {
  console.log('Too much arguments. Give a two part name in quotes: \'Donald Duck\'.')
  process.exit(1)
}

const input = {
  password: process.argv[2],
  name: process.argv[3],
  number: process.argv[4],
}

const url =
  `mongodb+srv://jariDB:${input.password}@cluster0-wnvyv.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => { console.log(error) })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    password: input.password,
    name: input.name,
    number: input.number,
  })

  person.save().then(() => {
    console.log('added',person.name,person.number,'to phonebook')
    mongoose.connection.close()
  })
} else {
  console.log('Too few arguments. Did you forget number or name?')
  mongoose.connection.close()
}
