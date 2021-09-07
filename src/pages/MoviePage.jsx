import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getGenres, getMovieImg, getMoviesById, getSimilar } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'

const classNames = require("classnames");

export const MoviePage = ({id}) => {
  const match = useRouteMatch("/movies/:movieId");
  const [cast, setCast] = useState([])
  const [crew, setCrew] = useState([])
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const location = useLocation();

  console.log(cast)

  useEffect(() => {
    getCrew(match.params.movieId).then((response) => { setCrew(response.reverse()) })
    getCredits(match.params.movieId).then((response) => { setCast(response.reverse()) })
    getMoviesById(match.params.movieId).then((response) => { setMovie(response) })
    getSimilar(match.params.movieId).then((response) => { setSimilar(response) })
  }, [location])

  return (
    <div className="page">
      <div className="container">
        <div className="movie-page">
          <section className="page__section grid">
            <div className="movie-page__poster grid__item--1-4">
              <img src={getMovieImg(movie.poster_path)} alt="" className="movie-page__poster-img appear" />
            </div>
            <div className="movie-page__description grid grid__item--5-12">
              <div className="grid__item--1-12 page__title movie-page__title slideRight">
                {movie?.title}
              </div>
              <div className="movie-page__overview grid__item--1-12 slideRight">
                {movie.overview}
              </div>
              <div className="movie-page__genres-list grid__item-1-12 slideRight">
                {movie.genres?.map(({name}) =>
                  <div className="movie-page__genre">
                    {name}
                  </div>
                )}
              </div>
              {movie.belongs_to_collection &&
                <div className="grid__item--1-12">
                  collection:
                  <Link to={`/collections/${movie.belongs_to_collection.id}`}>
                    {movie.belongs_to_collection.name}
                  </Link>
                </div>
              }
            </div>
          </section>
          <section className="page__section">
            <div className="page__title">
              Cast
            </div>
            <MoviesSlider peopleList={cast} />
            <div className="page__title">
              Crew
            </div>
            <MoviesSlider peopleList={crew} />
          </section>
          <section className="page__section">
            <div className="page__title">
              Similar
            </div>
            <MoviesSlider moviesList={similar} />
          </section>
        </div>
      </div>
    </div>
  )
}