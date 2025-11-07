import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return(
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible}>
          {blog.title} <button onClick={() => setVisible(true)}>view</button>
        </div>

        <div style={showWhenVisible}>
          {blog.title} <button onClick={() => setVisible(false)}>hide</button>
          <br/>{blog.url}
          <br/>likes {blog.likes} <button>like</button>
          <br/>{blog.author}
        </div>
      </div>
    </div> 
  )
}

export default Blog