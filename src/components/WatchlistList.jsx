import React, { useEffect, useRef, useState } from 'react'
import { MovieCard } from './MovieCard';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGenres } from './api';
import { PersonCard } from './PersonCard';
import { WatchlistElement } from './WatchlistElement';

const classNames = require('classnames');

export const WatchlistList = ({moviesList, media_type}) => {
  const slider = useRef(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
  }, [])

  return (
    <div className="watchlist__list">
      {moviesList?.map((movie) => (
        <WatchlistElement key={Math.random()}movie={movie} media_type={media_type} genres={genres}/>
      ))}
    </div>
  )
}