import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLike = event => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleBlogUpdate(updatedBlog)
  }

  return(
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
        </div>

        <div style={showWhenVisible}>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
          <br/>{blog.url}
          <br/>likes {blog.likes} <button onClick={increaseLike}>like</button>
          <br/>{blog.user.name}
        </div>
      </div>
    </div> 
  )
}

export default Blog