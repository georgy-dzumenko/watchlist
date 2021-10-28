import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { cleanAccInfo, setSessionId, updateAccInfo, updateWatchlist } from '../redux/actions';
import { WatchlistTab } from '../components/WatchlistTab';
import { WatchlistList } from '../components/WatchlistList';
import { useRouteMatch } from 'react-router';

const classNames = require('classnames')

const WatchlistPage = ({session_id, watchlist, updateWatchlist}) => {
  const match = useRouteMatch('/watchlist/:mediaType')

  useEffect(() => updateWatchlist(session_id), [])

  return (
    <div className="page">
      <div className="container">
        <div className="watchlist">
          <div className="watchlist__list-select-block">
            <WatchlistTab title="tv series" titleInUrl="tv"/>
            <WatchlistTab title="movies" titleInUrl="movie"/>
          </div>
          {match?.params?.mediaType === 'movie'
            ? <WatchlistList moviesList={watchlist.movie?.map((movie) => ({...movie, media_type: 'movie'}))} media_type="movie"/>
            : <WatchlistList moviesList={watchlist.tv?.map((movie) => ({...movie, media_type: 'tv'}))} media_type="tv"/>
          }
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session ,watchlist: state.session.watchlist}), {cleanAccInfo, setSessionId, updateAccInfo, updateWatchlist})(WatchlistPage)