import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "RESET":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = (dispatch, content, duration) => {
  // I noticed, thanks to internet, that it is not reglementary to use
  // useNotificationDispatch() in this function, so I put dispatch in props
  dispatch({ type: "SET", payload: content })

  const timeoutDuration = duration * 1000

  setTimeout(() => {
    dispatch({ type: "RESET" })
  }, timeoutDuration)
}

export default NotificationContext