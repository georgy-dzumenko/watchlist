import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getGenres, getMovieImg } from './api'

const classNames = require("classnames");

export const MovieCard = ({last = false, movie}) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(response => setGenres(response.genres))
  }, [])
  
  return (
    <Link
      to={`/movies/${movie.id}`}
      className={classNames("movie-card", {"movie-card--last": last})}
    >
      <img src={getMovieImg(movie?.poster_path, true)} alt="" className="movie-card__img" />
      <div className="movie-card__description">
        <img className="movie-card__description-img" src={getMovieImg(movie.backdrop_path, true)} alt="" />
        <div className="movie-card__description-content">
          <h1 className="movie-card__description-title">{movie?.title}</h1>
          <ul className="movie-card__description-ganres-list">
            {movie.genre_ids?.map((genreId) =>
              <li className="movie-card__description-ganre">
                {genres?.find(({id}) => genreId === id)?.name}
              </li>
            )}
          </ul>
        </div>
      </div>
    </Link>
  )
}