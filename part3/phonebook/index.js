require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())

app.use(express.static('build'))

morgan.token('body', (req, res) => {
  // Because JSON.stringify returns '{}' if req.body is empty, no need to put a condition tester if else
  return JSON.stringify(req.body)
})

app.use(express.json())

// Following internet, tiny is equivalent to ':method :url :status :res[content-length] - :response-time ms'. I just needed to add body at the end.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const requestTime = new Date()

    response.send(` <p>Phonebook has info for ${phonebook.length} people</p>
                    <p>${requestTime}</p>`)

})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 10000);
}

app.post('/api/persons', (request, response) => {
  console.log('hey');
  
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const personToAdd = new Person({
    name: body.name,
    number: body.number,
  })
  
  personToAdd.save().then(savedPerson => {response.status(201).json(savedPerson)})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})