import React, { useEffect } from 'react'
import { getMovieImg } from './api'
import { useHistory } from 'react-router';
import AddToWatchListButton from './AddToWatchListButton';
import { connect } from 'react-redux';
import { Picture } from './Picture';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const classNames = require("classnames");

const ListElement = ({ movie, genres, media_type}) => {
  const history = useHistory();
  const {ref, inView} = useInView()
  const animation = useAnimation();

  useEffect(() => {
    if(inView) {
      animation.start({
        scaleX: 1
      })
    } else {
      animation.start({
        scaleX: 0
      })
    }
  }, [inView])
  return (
    <motion.div
      // initial={{scale: 0.1}}
      ref={ref}
      animate={animation}
      className={classNames("list-card")}
    >
      <div className="list-card__img">
        <Picture picture_path={movie.poster_path}/>
      </div>
      <div className="list-card__title">
        {movie.title}
      </div>
      {/* <div className="watchlist__remove-from-watchlist-block">
        <AddToWatchListButton media_id={movie.id} media_type={media_type} />
      </div> */}
      <div className="list-card__action-button-container">
        
      </div>
    </motion.div>
  )
}

export default connect((state) => ({genres: state.session.genres}))(ListElement)