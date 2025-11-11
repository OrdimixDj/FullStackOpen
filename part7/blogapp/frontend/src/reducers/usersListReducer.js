import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsersList(state, action) {
      return action.payload
    },
  },
})

export const { setUsersList } = usersListSlice.actions

export const initializeUsersList = () => {
  return async (dispatch) => {
    const blogs = await usersService.getAll()
    dispatch(setUsersList(blogs))
  }
}

export default usersListSlice.reducer
