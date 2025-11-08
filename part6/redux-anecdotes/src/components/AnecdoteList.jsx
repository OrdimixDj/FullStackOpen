import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const voteAnecdote = id => {
    dispatch(voteFor(id))
    console.log('vote', id)
  }

  const sortedAnecdotes = [...anecdotes].sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)

  return (
    <>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteForm