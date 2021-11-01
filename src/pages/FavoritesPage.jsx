import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { cleanAccInfo, setSessionId, updateAccInfo, updateFavoritesList } from '../redux/actions';
import { WatchlistList } from '../components/WatchlistList';
import { useRouteMatch } from 'react-router';
import { FavoritesTab } from '../components/FavoritesTab';
import { FavortiesList } from '../components/FavortiesList';

const classNames = require('classnames')

const Favorites = ({session_id, favorites, updateFavoritesList}) => {
  const match = useRouteMatch('/favorites/:mediaType')

  useEffect(() => updateFavoritesList(session_id), [])

  return (
    <div className="page">
      <div className="container">
        <div className="watchlist">
          <div className="watchlist__list-select-block">
            <FavoritesTab title="tv series" titleInUrl="tv"/>
            <FavoritesTab title="movies" titleInUrl="movie"/>
          </div>
          {match?.params?.mediaType === 'movie'
            ? <FavortiesList moviesList={favorites.movie?.map((movie) => ({...movie, media_type: 'movie'}))} media_type="movie"/>
            : <FavortiesList moviesList={favorites.tv?.map((movie) => ({...movie, media_type: 'tv'}))} media_type="tv"/>
          }
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session, favorites: state.session.favorites}), {cleanAccInfo, setSessionId, updateAccInfo, updateFavoritesList})(Favorites)