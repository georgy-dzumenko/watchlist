import { getAccInfo } from "../components/api"
import { CHANGE_LANGUAGE, CLEAN_ACCINFO, CLEAN_FAVORITES, CLEAN_WATCHLIST, SET_SESSION_ID, UPDATE_ACCINFO, UPDATE_FAVORITES, UPDATE_LISTS, UPDATE_WATCHLIST } from "./types"

const initialState = {
  session: localStorage.getItem('session') || '',
  accInfo: JSON.parse(localStorage.getItem('accInfo') || '{}') || {},
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '{}') || {},
  favorites: JSON.parse(localStorage.getItem('favorites') || '{}') || {},
  lists: JSON.parse(localStorage.getItem('lists') || '[]') || [],
  genres: [
    {"id":28,"name":"Action"}, {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"}, {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"}, {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"}, {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"}, {"id":36,"name":"History"},
    {"id":27,"name":"Horror"}, {"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"}, {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"}, {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}
  ],
  language: localStorage.getItem('language') || 'en',
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
    case UPDATE_LISTS:
      return ({...state, lists: action.payload})
    case CLEAN_FAVORITES:
      return ({...state, favorites: {}})
    case CHANGE_LANGUAGE:
      return ({...state, language: action.payload})
  }
  return state
}
