import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const blogToUpdate = action.payload

      return state.map((blog) =>
        blog.id !== blogToUpdate.id ? blog : blogToUpdate,
      )
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload

      return state.filter((blog) => blog.id !== blogToRemove.id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { updateBlog, appendBlog, removeBlog, setBlogs } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch, getState) => {
    const user = getState().user
    const newBlog = await blogService.create(content, user.token)
    newBlog.user = user
    dispatch(appendBlog(newBlog))
  }
}

export const changeBlog = (newBlog) => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const blogUpdated = await blogService.update(newBlog, token)
    dispatch(updateBlog(blogUpdated))
  }
}

export const commentBlog = (blog, commentContent) => {
  return async (dispatch) => {
    const blogUpdated = await blogService.comment(blog, commentContent)
    dispatch(updateBlog(blogUpdated))
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    await blogService.remove(blogToDelete, token)
    dispatch(removeBlog(blogToDelete))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    const blogUpdated = await blogService.update(blogToUpdate, token)
    blogUpdated.user = blog.user
    dispatch(updateBlog(blogUpdated))
  }
}

export default blogsSlice.reducer
