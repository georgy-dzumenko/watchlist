import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getMoviesByYear, getTrending } from '../components/api'
import { MoviesSlider } from '../components/MoviesSlider';
import { Poster } from '../components/Poster';
import { translate } from '../components/translate';

const Home = ({accInfo}) => {
  const [moviesOnPoster, setMoviesOnPoster] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending()
      .then((result) => setMoviesOnPoster(result))
    getTrending()
      .then((result) => setTrending(result))
  }, [])

  return (
    <div className="page home">
      <div className="container">
        <h1 className="page__title">
          {!accInfo?.username
            ? translate({
              'en': "Home",
              "uk": 'Домашня сторінка'
            })
            : `${translate({
              'en': "Ні,",
              "uk": 'Привіт,'
            })} ${accInfo?.username}!`
          }
        </h1>
        
        <section className="page__section">
          <main>
            <Poster moviesList={trending}/>
          </main>
        </section>
        <section className="page__section">
          <div className="page__title">
            {translate({
              'en': "Trending",
              "uk": 'У тренді'
            })}
          </div>
          <MoviesSlider moviesList={trending}/>
        </section>
      </div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session, accInfo: state.session.accInfo}))(Home)
