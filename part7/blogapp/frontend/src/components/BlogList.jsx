import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes,
  )

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
