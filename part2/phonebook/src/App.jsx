import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const Notification = ({ message }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  if (message === '') {
    return null
  }

  return (
    <div style={messageStyle}>
      <b>{message}</b>
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm message={message} setMessage={setMessage} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={newFilter} />
    </div>
  )
}

export default App