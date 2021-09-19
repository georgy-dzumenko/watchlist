import React, { useCallback, useEffect, useState } from 'react'
import { getMovieImg, getMoviesByYear } from '../components/api'
import { MoviesSlider } from '../components/MoviesSlider';
import { Poster } from '../components/Poster';

const classNames = require('classnames');

export const Home = () => {
  const [moviesOnPoster, setMoviesOnPoster] = useState([]);
  const [newTv, setNewTv] = useState([]);
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    getMoviesByYear("2021", 'multi')
      .then((result) => setMoviesOnPoster(result))
    getMoviesByYear("2021", 'movie')
      .then((result) => setNewMovies(result))
    getMoviesByYear("2021", 'tv')
      .then((result) => setNewTv(result))
    console.log(moviesOnPoster)
  }, [])

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <div className="page home">
      <div className="container">
        <h1 className="page__title">
          Home
        </h1>
        
        <section className="page__section">
          <main>
            <Poster moviesList={moviesOnPoster}/>
          </main>
        </section>

        <section className="page__section">
          <div className="page__title">
            Newest tv shows
          </div>
          <MoviesSlider moviesList={newTv}/>
        </section>
        <section className="page__section">
          <div className="page__title">
            Newest movies
          </div>
          <MoviesSlider moviesList={newMovies}/>
        </section>
      </div>
    </div>
  )
}