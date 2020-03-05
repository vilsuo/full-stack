const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.value
    default:
      return state
  }
}

export const changeFilter = (value) => {
  return ({
    type: 'CHANGE',
    value
  })
}

export default filterReducer