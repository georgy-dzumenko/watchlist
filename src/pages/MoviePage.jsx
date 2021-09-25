import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getMovieImg, getMoviesById, getSimilar, getTrailer } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'

export const MoviePage = () => {
  const match = useRouteMatch("/:movieType/:movieId");
  const [cast, setCast] = useState([])
  const [trailer, setTrailer] = useState([])
  const [crew, setCrew] = useState([])
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const location = useLocation();

  console.log(cast)

  useEffect(() => {
    getTrailer(match.params.movieId, match.params.movieType).then((response) => { setTrailer(response[0]?.key) })
    getCrew(match.params.movieId, match.params.movieType).then((response) => { setCrew(response.reverse()) })
    getCredits(match.params.movieId, match.params.movieType).then((response) => { setCast(response.reverse()) })
    getMoviesById(match.params.movieId, match.params.movieType).then((response) => { setMovie(response) })
    getSimilar(match.params.movieId, match.params.movieType).then((response) => { setSimilar(response) })
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match])

  return (
    <div className="page">
      <div className="container">
        <div className="movie-page">
          <section className="page__section grid grid--desktop">
            <div className="movie-page__poster grid__item--1-4">
              <img src={getMovieImg(movie.poster_path)} alt="" className="movie-page__poster-img" />
            </div>
            <div className="page__description grid__item--5-12 grid grid--desktop">
              <div className="grid__item--1-12 page__title movie-page__title">
                {movie?.title}
              </div>
              <div className="movie-page__votes grid__item--1-12">
                imdb: <span className="movie-page__votes-value">{movie?.vote_average}</span>
              </div>
              <div className="movie-page__overview grid__item--1-12">
                {movie.overview}
              </div>
              <div className="movie-page__genres-list grid__item-1-12">
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
            <div className="movie-page__trailer">
              <iframe
                className="movie-page__video"
                src={`https://www.youtube.com/embed/${trailer}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
