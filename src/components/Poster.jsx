import React, {useState, useEffect, useCallback} from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import debounce from 'lodash.debounce';

const classNames = require("classnames");

export const Poster = ({moviesList}) => {
  const [isActive, setActive] = useState(false);
  const [selectedMovieId, selectMovieId] = useState(0)
  const moviePicture = new Image(1180, 590);
  moviePicture.src = `https://image.tmdb.org/t/p/original/${moviesList[selectedMovieId]?.backdrop_path}`
  moviePicture.onload = () => setTimeout(
    () => setActive(true), 1000);

  moviePicture.onloadstart = () => setActive(false)
    

  const nextMovie = () => {
    if (selectedMovieId === moviesList.length - 1) {
      selectMovieId(0);

      return
    }

    selectMovieId(selectedMovieId + 1);
  }

  const nextMovieWithDebounce = useCallback(debounce(nextMovie, 10000), [selectedMovieId])

  const prevMovie = () => {
    if (selectedMovieId === 0) {
      selectMovieId(moviesList.length - 1);

      return
    }

    selectMovieId(selectedMovieId - 1);
  }

  useEffect(() => {
    nextMovieWithDebounce();

    return nextMovieWithDebounce.cancel;
  }, [selectedMovieId])

  return (
    <div className="poster">
    <div onClick={prevMovie} className="poster__arrow poster__arrow--left"><FontAwesomeIcon icon={faChevronLeft}/></div>
    <img
      src={moviePicture.src}
      className={classNames("poster__img", {"poster__img--active": isActive})}
    ></img>
    <h1 className="poster__title">
      {moviesList[selectedMovieId]?.title}
    </h1>
    <div className={classNames("poster__timer", {})}></div>
    <div onClick={nextMovie} className="poster__arrow poster__arrow--right"><FontAwesomeIcon icon={faChevronRight}/></div>
  </div>
  )
}