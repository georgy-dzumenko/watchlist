import { getAccInfo, getMoviesById, getWatchlist } from "../components/api"
import { CLEAN_ACCINFO, CLEAN_WATCHLIST, GET_WATCHLIST, SET_SESSION_ID, UPDATE_ACCINFO, UPDATE_WATCHLIST } from "./types"

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
  localStorage.setItem('watchlist', '{}')
  return dispatch => {
    getAccInfo(session_id).then((account) => {
      console.log('accinf', account.id)
      getWatchlist({session_id, account_id: account.id, media_type: 'tv'}).then((res) => {
        console.log('accinf', res)
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
