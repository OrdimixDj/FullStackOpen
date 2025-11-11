import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import { setNotification } from '../reducers/notificationReducer'
import { disconnectUser } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleDisconnectUser = async (event) => {
    event.preventDefault()

    try {
      dispatch(disconnectUser())
    } catch (exception) {
      dispatch(
        setNotification(`Error: ${exception.response.data.error}`, 'error', 5),
      )
    }
  }

  if (!user.name) {
    return (
      <>
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      {user.name} logged in{' '}
      <button id="logout-button" onClick={handleDisconnectUser}>
        logout
      </button>
    </div>
  )
}

export default Login
