import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const user = useSelector((state) => state.user)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenSameUser = {
    display:
      user && blog.user && user.username === blog.user.username ? '' : 'none',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLike = async (event) => {
    event.preventDefault()

    try {
      dispatch(likeBlog(blog))
      dispatch(
        setNotification(
          `Blog ${blog.title} by ${blog.author} successfully voted`,
          'other',
          5,
        ),
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

  const removeBlog = async (event) => {
    event.preventDefault()

    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author)) {
      try {
        dispatch(deleteBlog(blog))

        dispatch(
          setNotification(
            `Blog ${blog.title} by ${blog.author} successfully removed`,
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
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <div style={hideWhenVisible} className="blog-not-complete">
          {blog.title} {blog.author}{' '}
          <button className="view-button" onClick={() => setVisible(true)}>
            view
          </button>
        </div>

        <div style={showWhenVisible} className="blog-complete">
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}{' '}
          <button className="like-button" onClick={increaseLike}>
            like
          </button>
          <br />
          {blog.user.name}
          <div id="remove-blog-button" style={showWhenSameUser}>
            <button onClick={removeBlog}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
