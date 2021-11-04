import { getAccInfo, getFavorites, getLists, getMoviesById, getWatchlist } from "../components/api"
import { CLEAN_ACCINFO, CLEAN_FAVORITES, CLEAN_WATCHLIST, GET_WATCHLIST, SET_SESSION_ID, UPDATE_ACCINFO, UPDATE_FAVORITES, UPDATE_LISTS, UPDATE_WATCHLIST } from "./types"

export const setSessionId = (session_id) => {
  localStorage.setItem('session', session_id)
  return {
    type: SET_SESSION_ID,
    payload: session_id
  }
}

export const updateAccInfo = (session_id) => {
  console.log('upd')
  return dispatch => {
    getAccInfo(session_id).then((res) => {
      localStorage.setItem('accInfo', JSON.stringify(res))
      dispatch({
        type: UPDATE_ACCINFO,
        payload: res,
      })
    })
  }
}

export const cleanAccInfo = () => {
  localStorage.setItem('accInfo', '{}')
  return ({type: CLEAN_ACCINFO})
}

export const cleanWatchlist = () => {
  localStorage.setItem('watchlist', '{}')
  return ({type: CLEAN_WATCHLIST})
}

export const updateWatchlist = (session_id) => {
  return dispatch => {
    getAccInfo(session_id).then((account) => {
      getWatchlist({session_id, account_id: account.id, media_type: 'tv'}).then((res) => {
        return res
      }).then((res) => getWatchlist({session_id,  account_id: account.id, media_type: 'movie'}).then((response) => {
        localStorage.setItem('watchlist', JSON.stringify({movie: response, tv: res}))
        return (dispatch({
          type: UPDATE_WATCHLIST,
          payload: {movie: response, tv: res},
        }))
      }))
    })
  }
}

export const updateFavoritesList = (session_id) => {
  return dispatch => {
    getAccInfo(session_id).then((account) => {
      getFavorites({session_id, account_id: account.id, media_type: 'tv'}).then((res) => {
        return res
      }).then((res) => getFavorites({session_id,  account_id: account.id, media_type: 'movie'}).then((response) => {
        localStorage.setItem('favorites', JSON.stringify({movie: response, tv: res}))
        return (dispatch({
          type: UPDATE_FAVORITES,
          payload: {movie: response, tv: res},
        }))
      }))
    })
  }
}

export const updateLists = (session_id) => {
  return dispatch => {
    getAccInfo(session_id).then((account) => {
      getLists(session_id, account.id).then((res) => {
        localStorage.setItem('lists', JSON.stringify(res))
        return (dispatch({
          type: UPDATE_LISTS,
          payload: res,
        }))
      })
    })
  }
}

export const cleanFavoritesList = () => {
  localStorage.setItem('favorites', '{}')
  return ({type: CLEAN_FAVORITES})
}
