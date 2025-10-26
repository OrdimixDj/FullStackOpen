const Persons = ({persons, filter}) => {
  const newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    newPersons.map(person => <Person key={person.id} person={person} />)
  )
}

const Person = ({person}) => <p>{person.name} {person.number}</p>

export default Persons