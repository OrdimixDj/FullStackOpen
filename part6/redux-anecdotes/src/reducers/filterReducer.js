const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CHANGE_VALUE':
      return action.payload.content
    default: return state
  }
}

export const modifyFilter = (content) => {
  return {
    type: 'CHANGE_VALUE',
    payload: {content}
  }
}

export default filterReducer
