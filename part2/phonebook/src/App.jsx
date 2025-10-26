import { useState } from 'react'

const Persons = ({persons}) => persons.map(person => <Person key={person.name} person={person} />)

const Person = ({person}) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const onClick = (event) => {
    console.log(event.target.value)
    event.preventDefault()
    const newPersons = persons.concat({name: newName})
    setPersons(newPersons)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    <div>debug: {newName}</div>
    </div>
  )
}

export default App