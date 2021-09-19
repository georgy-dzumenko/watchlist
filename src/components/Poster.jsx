import React, {useState, useEffect, useCallback} from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/navigation/navigation.scss'
// import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/pagination/pagination.less';
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.scss'
import 'swiper/swiper.less'
import { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { EffectCoverflow } from 'swiper';


import { Navigation, Pagination, A11y, Parallax } from 'swiper';

import debounce from 'lodash.debounce';
import { getMovieImg } from './api';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectCoverflow, Parallax]);
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
          <SwiperSlide>
            <div className="poster">
              <Link to={`${movie.media_type}/${movie.id}`}>
                <img src={getMovieImg(movie.backdrop_path)} className="poster__img"/>
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