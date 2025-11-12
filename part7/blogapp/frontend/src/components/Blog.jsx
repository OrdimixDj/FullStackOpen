import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const blogId = useParams().id
  const blogs = useSelector((state) => state.blogs)

  const blog = blogs.find((blog) => blog.id === blogId)

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

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

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={increaseLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default Blog
