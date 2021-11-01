import React, { useEffect, useRef, useState } from 'react'
import { getGenres } from './api';
import { FavoritesListElement } from './FavoritesListElement';

const classNames = require('classnames');

export const FavortiesList = ({moviesList, media_type}) => {
  const slider = useRef(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
  }, [])

  return (
    <div className="watchlist__list">
      {moviesList?.map((movie) => (
        <FavoritesListElement key={Math.random()} movie={movie} media_type={media_type} genres={genres}/>
      ))}
    </div>
  )
}