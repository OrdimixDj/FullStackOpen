import { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.content === null) {
    return null
  }

  if (message.content === '') {
    return null
  }

  if(message.type == 'error') {
    messageStyle.color = 'red'
  }
  else
  {
    messageStyle.color = 'green'
  }

  return (
    <div style={messageStyle}>
      <b>{message.content}</b>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({content:'', type:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      setBlogs(blogs.concat(returnedBlog))
      setMessage({content:`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type:'other'})
    } catch (exception) {
      const statusCode = exception.response.status

      if (statusCode === 400) {
        setMessage({content:`Bad request: title and url are required`, type:'error'})
      } else {
        setMessage({content:`Error: ${exception.response.data.error}`, type:'error'})
      }
    }

    setTimeout(() => {
      setMessage({content:null, type:null})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception)
    {
      const statusCode = exception.response.status

      if (statusCode === 401) {
          setMessage({content:`wrong username or password`, type:'error'})
      } else {
          setMessage({content:`Error: ${exception.response.data.error}`, type:'error'})
      }
      
      setTimeout(() => {
          setMessage({content:null, type:null})
      }, 5000)
    }
  }

  const disconnectUser = async (event) => {
    event.preventDefault()
    
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
    } catch (exception)
    {
      setMessage({content:`Error: ${exception.response.data.error}`, type:'error'})

      setTimeout(() => {
          setMessage({content:null, type:null})
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>      
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={disconnectUser}>logout</button></p><br/><br/>
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App