import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleVoteAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    console.log('vote', anecdote.id)

    dispatch(addNotification('you voted \'' + anecdote.content + '\''))

    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteForm