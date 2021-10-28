import React, { useEffect, useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getMovieImg, getMoviesById, getReviews, getSimilar, getTrailer } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'
import AddToWatchListButton from '../components/AddToWatchListButton';

import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import MarkAsFavoriteButton from '../components/MarkAsFavoriteButton';

const MoviePage = ({accInfo}) => {
  const match = useRouteMatch("/:movieType/:movieId");
  const [cast, setCast] = useState([])
  const [trailer, setTrailer] = useState([])
  const [crew, setCrew] = useState([])
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();

  // console.log(accInfo)

  useEffect(() => {
    getTrailer(match.params.movieId, match.params.movieType).then((response) => { setTrailer(response[0]?.key) })
    getCrew(match.params.movieId, match.params.movieType).then((response) => { setCrew(response.reverse()) })
    getCredits(match.params.movieId, match.params.movieType).then((response) => { setCast(response.reverse()) })
    getMoviesById(match.params.movieId, match.params.movieType).then((response) => { setMovie(response) })
    getSimilar(match.params.movieId, match.params.movieType).then((response) => { setSimilar(response) })
    getReviews(match.params.movieId, match.params.movieType).then((response) => { setReviews(response) })
  }, [location.pathname, match.params.movieId, match.params.movieType])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match])

  return (
    <div className="page">
      <div className="container">
        <div className="movie-page">
          <section className="page__section grid grid--desktop">
            <motion.div
              initial={{opacity: 0, translateX: -100}}
              animate={{opacity: 1, translateX: 0}}
              transition={{ duration: 0.5}}
              className="movie-page__poster grid__item--1-4"
            >
              <img src={getMovieImg(movie.poster_path)} alt="" className="movie-page__poster-img" />
            </motion.div>
            <div className="page__description grid__item--5-12 grid--desktop">
              <motion.div
                initial={{opacity: 0, translateX: -200}}
                animate={{opacity: 1, translateX: 0}}
                transition={{ duration: 0.7}}
                className="grid"
              >
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
                    <Link className="movie-page__action-title-link" to={`/collections/${movie.belongs_to_collection.id}`}>
                      {movie.belongs_to_collection.name}
                    </Link>
                  </div>
                }
                <div className="grid__item--1-12">
                  <div className="movie-page__action">
                    <div className="movie-page__activon-title">
                      Add to/remove from <Link to={`/watchlist/${match.params.movieType}`} className="movie-page__action-title-link">watchlist</Link>
                    </div>
                    {!!accInfo.username
                      &&
                        <AddToWatchListButton
                          media_id={match.params.movieId}
                          media_type={match.params.movieType}
                        />
                    }
                    {!!accInfo.username
                      &&
                        <MarkAsFavoriteButton
                          media_id={match.params.movieId}
                          media_type={match.params.movieType}
                        />
                    }
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          <section className="page__section">
            <div className="movie-page__trailer">
              <iframe
                title="trailer"
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
              reviews
            </div>
              {
                reviews.map((review) => (
                    <div className="review">
                      <div className="review__author">
                        <img
                          src={
                            getMovieImg(review.author_details.avatar_path, true)
                          }
                          alt=""
                          className="review__author-img"
                        />
                        <div className="review__author-nickname">
                          {review.author_details.name}
                        </div>
                      </div>
                      <div className="review__content">
                        {review.content}
                      </div>
                      <div className="review__footer">
                        {new Date(review.created_at).toLocaleString('default', { year: 'numeric', month: 'long' })}
                      </div>
                    </div>
                ))
              }
          </section>
          <section className="page__section">
            {cast.length > 0
              ?
                <>
                  <div className="page__title">
                   Cast
                  </div>
                  <MoviesSlider peopleList={cast} />
                </>
              : ''
            }
            {crew.length > 0
              ?
                <>
                  <div className="page__title">
                    Crew
                  </div>
                  <MoviesSlider peopleList={crew} />
                </>
              : ''
            }
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

export default connect((state) => ({accInfo: state.session.accInfo}))(MoviePage)