import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { changeUser } from '../reducers/userReducer'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(changeUser(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      const statusCode = exception.response.status

      if (statusCode === 401) {
        dispatch(setNotification(`wrong username or password`, 'error', 5))
      } else {
        dispatch(
          setNotification(
            `Error: ${exception.response.data.error}`,
            'error',
            5,
          ),
        )
      }
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default LoginForm
