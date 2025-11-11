import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!notification.content) {
    return null
  }

  if (notification.type == 'error') {
    messageStyle.color = 'red'
  } else {
    messageStyle.color = 'green'
  }

  return <div style={messageStyle}>{notification.content}</div>
}

export default Notification
