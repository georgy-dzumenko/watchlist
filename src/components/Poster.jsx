import React, {useState, useEffect, useCallback} from 'react'
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { EffectCoverflow } from 'swiper';


import { Navigation, Pagination, A11y, Parallax } from 'swiper';

import debounce from 'lodash.debounce';
import { getMovieImg } from './api';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectCoverflow, Parallax]);

export const Poster = ({moviesList}) => {
  const [selectedMovieId, selectMovieId] = useState(0)
  const moviePicture = new Image(1180, 590);
  moviePicture.src = `https://image.tmdb.org/t/p/original/${moviesList[selectedMovieId]?.backdrop_path}`

  const nextMovie = () => {
    if (selectedMovieId === moviesList.length - 1) {
      selectMovieId(0);

      return
    }

    selectMovieId(selectedMovieId + 1);
  }

  const nextMovieWithDebounce = useCallback(debounce(nextMovie, 10000), [selectedMovieId])

  useEffect(() => {
    nextMovieWithDebounce();

    return nextMovieWithDebounce.cancel;
  }, [selectedMovieId, nextMovieWithDebounce])

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, EffectCoverflow, Parallax]}
      effect="coverflow"
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      onSwiper={(swiper) => console.log(swiper)}
    >
        {moviesList?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="poster">
              <Link to={`${movie.media_type}/${movie.id}`}>
                <img src={getMovieImg(movie.backdrop_path)} className="poster__img" alt=""/>
                <div className="poster__title">
                  {movie.title}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="prev"></div>
        <div className="next"></div>
      </Swiper>
  )
}