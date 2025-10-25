import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const updateSelected = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] += 1     
    setVotes(copy)
  }

  const getMaxArray = () => Math.max(...votes)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))





  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <br/> has {votes[selected]} votes</p>
      <Button onClick={updateVotes} text='vote' />
      <Button onClick={updateSelected} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(getMaxArray())]} <br/> has {getMaxArray()} votes</p>
    </div>
  )
}

export default App