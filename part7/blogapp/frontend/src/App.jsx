import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  if (!user.token) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <Login />

      <br />
      <br />
      <Togglable
        buttonId="show-create-blog-div-button"
        buttonLabel="create new blog"
        ref={blogFormRef}
      >
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogList />
    </div>
  )
}

export default App
