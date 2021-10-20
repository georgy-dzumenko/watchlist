import { SET_SESSION_ID } from "./types"

export const setSessionId = (session_id) => {
  localStorage.setItem('session', session_id)
  return {
    type: SET_SESSION_ID,
    payload: session_id
  }
}