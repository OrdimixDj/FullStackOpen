const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => {
  const total = parts.reduce((accumulator, parts) => {
    return accumulator + parts.exercises;
  }, 0);

  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <p><b>total of {total} exercises</b></p>
    </>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

export default Course