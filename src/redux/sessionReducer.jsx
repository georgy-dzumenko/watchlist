import { SET_SESSION_ID } from "./types"

const initialState = {
  session: localStorage.getItem('session') || ''
}


export const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SESSION_ID:
      return ({session: action.payload})
  }
  return state
}