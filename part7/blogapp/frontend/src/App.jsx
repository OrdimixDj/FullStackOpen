import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsersList } from './reducers/usersListReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsersList())
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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable
                buttonId="show-create-blog-div-button"
                buttonLabel="create new blog"
                ref={blogFormRef}
              >
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>

              <BlogList />
            </>
          }
        />

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
