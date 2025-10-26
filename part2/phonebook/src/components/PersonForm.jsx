const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberInputChange = (event) => {
        setNewNumber(event.target.value)
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
        <form>
            <div>name: <input onChange={handleNameInputChange} /></div>
            <div>number: <input onChange={handlePhoneNumberInputChange} /></div>
            <div><button type="submit" onClick={onClick}>add</button></div>
        </form>
    )
}

export default PersonForm