import React, { useRef, useState } from 'react'
import { MovieCard } from './MovieCard';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMovieImg } from './api';
import { PersonCard } from './PersonCard';

export const MoviesSlider = ({moviesList = null, peopleList = []}) => {
  const slider = useRef(null);

  return (
    <div
    className="movies-slider"
    >
      {/* <img src={bannerMovie} className="movies-slider__banner"></img> */}
      <div
        onClick={() => {
          slider.current.scrollTo({
            left: -1 * slider.current.clientWidth * 0.9,
            behavior: "smooth"
          })
        }}
        className="movies-slider__scroll-button movies-slider__scroll-button--left"
        >
        <FontAwesomeIcon icon={faChevronLeft}/>
      </div>
      <div
        ref={slider}
        className="movies-slider__tape"
      >
        <div className="movies-slider__content">
          {peopleList.map((person) => (
            <div>
              <PersonCard person={person} />
            </div>
          ))}
          {!!moviesList ? moviesList?.map((movie, index) => (
            <div>
              <MovieCard last={index === 0} movie={movie}/>
            </div>
          )) : ''}
        </div>
      </div>
      <div
        onClick={() => {
          slider.current.scrollBy({
            left: slider.current.clientWidth * 0.9,
            behavior: "smooth"
          })
        }}
        className="movies-slider__scroll-button movies-slider__scroll-button--right"
      >
        <FontAwesomeIcon icon={faChevronRight}/>
      </div>
    </div>
  )
}