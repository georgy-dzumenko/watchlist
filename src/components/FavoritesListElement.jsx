import React from 'react'
import { getMovieImg } from './api'
import { useHistory } from 'react-router';
import MarkAsFavoriteButton from './MarkAsFavoriteButton';

const classNames = require("classnames");

export const FavoritesListElement = ({ movie, genres, media_type}) => {
  const history = useHistory();
  return (
    <div
      className={classNames("watchlist__card")}
    >
      <img
        onClick={() => {
          console.log(history)
          history.push(`/${movie.media_type}/${movie.id}`)
        }}
        src={getMovieImg(movie?.poster_path, true)}
        alt=""
        className="watchlist__card-img"
      />
      <div className="watchlist__description">
        <div className="watchlist__description-content">
          <h1 className="watchlist__description-title">{movie?.title}</h1>
          <ul className="watchlist__description-genres-list">
            {movie.genre_ids?.map((genreId) =>
              <li className="watchlist__description-genre">
                {genres.find(({id}) => genreId === id)?.name}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="watchlist__remove-from-watchlist-block">
        <MarkAsFavoriteButton key={movie.id} media_id={movie.id} media_type={media_type} />
      </div>
    </div>
  )
}
