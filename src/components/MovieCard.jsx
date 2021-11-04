import React from 'react'
import { getMovieImg } from './api'
import { Picture } from './Picture';
import AddToWatchListButton from './AddToWatchListButton';
import MarkAsFavoriteButton from './MarkAsFavoriteButton';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const classNames = require("classnames");

const MovieCard = ({ last = false, movie, genres}) => {
  const history = useHistory();

  return (
    <div
      className={classNames("movie-card", {"movie-card--last": last})}
      onClick={() => {
        history.push(`/${movie.media_type}/${movie.id}`)
        window.location.reload();
      }}
    >
      <div
        className="movie-card__img-container"
      >
        <Picture picture_path={movie?.poster_path} w500/>
      </div>
      <div className="movie-card__description">
        {movie.backdrop_path
          ?
            <img className="movie-card__description-img" src={getMovieImg(movie.backdrop_path, true)} alt="" />
          :
            ''
        }
        <div className="movie-card__description-content">
          <h1 className="movie-card__description-title">{movie?.title}</h1>
          <ul className="movie-card__description-ganres-list">
            {movie.genre_ids?.map((genreId) =>
              <li key={genreId} className="movie-card__description-ganre">
                {genres.find(({id}) => genreId === id)?.name}
              </li>
            )}
          </ul>
          <div onClick={(event) => {event.stopPropagation()}} className="movie-card__actions-container">
            <AddToWatchListButton media_id={movie.id} media_type={movie.media_type}/>
            <MarkAsFavoriteButton media_id={movie.id} media_type={movie.media_type}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({genres: state.session.genres}))(MovieCard)
