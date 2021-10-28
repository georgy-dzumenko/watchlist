import { getAccInfo } from "../components/api"
import { CLEAN_ACCINFO, CLEAN_FAVORITES, CLEAN_WATCHLIST, SET_SESSION_ID, UPDATE_ACCINFO, UPDATE_FAVORITES, UPDATE_WATCHLIST } from "./types"

const initialState = {
  session: localStorage.getItem('session') || '',
  accInfo: JSON.parse(localStorage.getItem('accInfo') || '{}') || {},
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '{}') || {},
  favorites: JSON.parse(localStorage.getItem('favorites') || '{}') || {},
}

export const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SESSION_ID:
      return ({...state, session: action.payload})
    case UPDATE_ACCINFO:
      return ({...state, accInfo: action.payload})
    case UPDATE_WATCHLIST:
      console.log(action.payload)
      return ({...state, watchlist: action.payload})
    case CLEAN_ACCINFO:
      return ({...state, accInfo: {}})
    case CLEAN_WATCHLIST:
      return ({...state, watchlist: {}})
    case UPDATE_FAVORITES:
      console.log(action.payload)
      return ({...state, favorites: action.payload})
    case CLEAN_FAVORITES:
      return ({...state, favorites: {}})
  }
  return state
}
