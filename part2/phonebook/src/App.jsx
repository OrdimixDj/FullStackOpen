import { useState } from 'react'

const Persons = ({persons, filter}) => {
  const newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    newPersons.map(person => <Person key={person.id} person={person} />)
  )
}

const Person = ({person}) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onClick = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(number => number.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      const newPersons = persons.concat({name: newName, number: newNumber, id:persons.length+1})
      setPersons(newPersons)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilterInputChange} /></div>
      <h2>add a new</h2>
      <form>
        <div>name: <input onChange={handleNameInputChange} /></div>
        <div>number: <input onChange={handlePhoneNumberInputChange} /></div>
        <div><button type="submit" onClick={onClick}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App