import React, { useEffect, useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getMovieImg, getMoviesById, getReviews, getSimilar, getTrailer } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'
import AddToWatchListButton from '../components/AddToWatchListButton';

import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import MarkAsFavoriteButton from '../components/MarkAsFavoriteButton';
import { Picture } from '../components/Picture';
import AddToListButton from '../components/AddToListButton';

const MoviePage = ({accInfo}) => {
  const match = useRouteMatch("/:mediaType/:mediaId");
  const [cast, setCast] = useState([])
  const [trailer, setTrailer] = useState([])
  const [crew, setCrew] = useState([])
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const mediaType = match.params.mediaType
  const mediaId = match.params.mediaId

  // console.log(accInfo)

  useEffect(() => {
    getTrailer(mediaId, mediaType).then((response) => { setTrailer(response[0]?.key) })
    getCrew(mediaId, mediaType).then((response) => { setCrew(response.reverse()) })
    getCredits(mediaId, mediaType).then((response) => { setCast(response.reverse()) })
    getMoviesById(mediaId, mediaType).then((response) => { setMovie(response) })
    getSimilar(mediaId, mediaType).then((response) => { setSimilar(response) })
    getReviews(mediaId, mediaType).then((response) => { setReviews(response) })
  }, [location.pathname, mediaId, mediaType])

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
              <div className="movie-page__poster-img">
                <Picture mediaType={mediaType} picture_path={movie.poster_path}/>
              </div>
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
                  rating: <span className="movie-page__votes-value">{movie?.vote_average}</span>
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
                          media_id={mediaId}
                          media_type={mediaType}
                        />
                    }
                    {!!accInfo.username
                      &&
                        <MarkAsFavoriteButton
                          media_id={mediaId}
                          media_type={mediaType}
                        />
                    }
                    {!!accInfo.username
                      &&
                        <AddToListButton
                          media_id={mediaId}
                          media_type={mediaType}
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