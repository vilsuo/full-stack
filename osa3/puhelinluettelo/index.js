require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/person')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(result => {
    response.send(`
      <div>
        <p>Phonebook has info for ${result} people</p>
        <p>${new Date()}</p>
      </div>
      `
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(result => {
    response.json(result)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('id to delete', request.params.id)
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateRandomId = () => Math.floor(Math.random()*Math.pow(10, 9))

app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })

/*  } else if (Person.findOne({ 'name': name })) {
    return response.status(400).json({
      error: 'name must be unique'
    })
*/

  } else {
    const person = new Person({
      "name": name,
      "number": number,
      "id": generateRandomId()
    })

    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  }
})

// EI TOIMI???????
app.put('/api/persons/:id', (request, response) => {
  console.log('pääsi')
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
    id: request.params.id,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      console.log('new: ', updatedPerson)
      response.status(204).end()
    })
    .catch(error => console.log('error'))
})

// olemattomien osoitteiden käsittely
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//app.use(unknownEndpoint)

// virheellisten pyyntöjen käsittely
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  /*
  if () {

  }
  */

  next(error)
}
//app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})