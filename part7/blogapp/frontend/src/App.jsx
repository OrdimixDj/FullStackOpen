import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleBlogUpdate = async (updatedBlog) => {
    try {
      blogService.update(updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          `Unable to like that blog. Exact error: ${exception.response.data.error}`,
          'error',
          5,
        ),
      )
    }
  }

  const handleBlogRemove = async (blogToDelete) => {
    try {
      blogService.remove(blogToDelete)
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      dispatch(
        setNotification(
          `Blog ${blogToDelete.title} by ${blogToDelete.author} successfully removed`,
          'other',
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          `Unable to remove that blog. Exact error: ${exception.response.data.error}`,
          'error',
          5,
        ),
      )
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog))

      dispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'other',
          5,
        ),
      )
    } catch (exception) {
      const statusCode = exception.response.status

      if (statusCode === 400) {
        dispatch(
          setNotification(
            `Bad request: title and url are required`,
            'error',
            5,
          ),
        )
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

    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const disconnectUser = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      dispatch(
        setNotification(`Error: ${exception.response.data.error}`, 'error', 5),
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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

  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes,
  )

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={disconnectUser}>
          logout
        </button>
      </p>
      <br />
      <br />
      <Togglable
        buttonId="show-create-blog-div-button"
        buttonLabel="create new blog"
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogUpdate={handleBlogUpdate}
          handleBlogRemove={handleBlogRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
