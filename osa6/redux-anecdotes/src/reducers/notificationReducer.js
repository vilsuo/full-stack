const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.notification
    case 'DELETE':
      return null
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return ({
    type: 'SET',
    notification
  })
}

export const deleteNotification = () => {
  return ({
    type: 'DELETE'
  })
}

export default notificationReducer