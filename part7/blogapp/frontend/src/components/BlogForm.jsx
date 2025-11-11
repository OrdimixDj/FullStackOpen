import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      dispatch(createBlog(newBlog, user))
      dispatch(
        setNotification(`a new blog ${title} by ${author} added`, 'other', 5),
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

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title-input"
            type="text"
            value={title}
            name="Title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author:
          <input
            id="author-input"
            type="text"
            value={author}
            name="Author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url:
          <input
            id="url-input"
            type="text"
            value={url}
            name="Url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default BlogForm
