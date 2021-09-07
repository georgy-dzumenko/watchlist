import React, { useCallback, useEffect, useState } from 'react'
import { getMoviesByYear } from '../components/api'
import { MoviesSlider } from '../components/MoviesSlider';
import { Poster } from '../components/Poster';

export const Home = () => {
  const [moviesOnPoster, setMoviesOnPoster] = useState([]);

  useEffect(() => {
    getMoviesByYear(2021).then((response) => setMoviesOnPoster(response.reverse() || [{}]))
  }, [])
  
  return (
    <div className="page home">
      <div className="container">
        <h1 className="page__title">
          Home
        </h1>
        
        <section className="page__section">
          <Poster moviesList={moviesOnPoster}/>
        </section>

        <section className="page__section">
          <MoviesSlider moviesList={moviesOnPoster}/>
        </section>
        <section className="page__section">
          <MoviesSlider moviesList={moviesOnPoster}/>
        </section>
      </div>
    </div>
  )
}