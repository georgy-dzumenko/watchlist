import React, { useEffect } from 'react'
import { getMovieImg } from './api'
import { useHistory } from 'react-router';
import AddToWatchListButton from './AddToWatchListButton';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const classNames = require("classnames");

export const WatchlistElement = ({ movie, genres, media_type}) => {
  const history = useHistory();
  const {ref, inView} = useInView({threshold: 0.2});
  const animation = useAnimation()

  useEffect(() => {
    if(inView) {
      animation.start({
        opacity: 1,
        transition: {
          duration: 0.2
        }
      })
    } else {
      animation.start({
        opacity: 0,
        transition: {
          duration: 0.2
        }
      })
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      // initial="hidden"
      animate={animation}
      // transition={{ duration: 0.3 }}
      // variants={{
      //   hidden: { opacity: 0, scale: 0 }
      // }}
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
        <AddToWatchListButton media_id={movie.id} media_type={media_type} />
      </div>
    </motion.div>
  )
}
