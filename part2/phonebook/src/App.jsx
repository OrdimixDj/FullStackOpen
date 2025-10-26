import { useState } from 'react'

const Persons = ({persons}) => persons.map(person => <Person key={person.name} person={person} />)

const Person = ({person}) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onClick = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(number => number.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      const newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input onChange={handleNameInputChange} /></div>
        <div>number: <input onChange={handlePhoneNumberInputChange} /></div>
        <div><button type="submit" onClick={onClick}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App