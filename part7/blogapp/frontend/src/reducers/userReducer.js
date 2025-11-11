import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  username: '',
  name: '',
}

const userReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userReducer.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const changeUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const disconnectUser = () => {
  return async (dispatch) => {
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(initialState),
    )
    dispatch(clearUser())
  }
}

export default userReducer.reducer
