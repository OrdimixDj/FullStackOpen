import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    deleteNotification(state, action) {
      return initialState
    }
  },
})

export const { addNotification, deleteNotification } = notificationReducer.actions
export default notificationReducer.reducer