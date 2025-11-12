import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { disconnectUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = () => {
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

  const backgroundColor = {
    backgroundColor: '#d3d3d3',
    padding: 5,
    display: 'flex',
  }

  const padding = {
    padding: 5,
  }

  return (
    <div style={backgroundColor}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>

      {user ? (
        <div style={padding}>
          {user.name} logged in
          <button
            style={{ marginLeft: 5 }}
            id="logout-button"
            onClick={handleDisconnectUser}
          >
            logout
          </button>
        </div>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  )
}

export default Menu
