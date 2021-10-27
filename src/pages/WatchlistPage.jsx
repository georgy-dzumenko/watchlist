import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';

import { cleanAccInfo, setSessionId, updateAccInfo, updateWatchlist } from '../redux/actions';
import { MoviesSlider } from '../components/MoviesSlider';
import { WatchlistList } from '../components/WatchlistList';
import folder from '../lottie/folder.json'
import Lottie from 'lottie-web';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const classNames = require('classnames')

const WatchlistPage = ({session_id, watchlist, updateWatchlist}) => {
  const [lottieAnim1, setLottieAnim1] = useState({})
  const [lottieAnim2, setLottieAnim2] = useState({})
  const animation1 = useRef(null)
  const animation2 = useRef(null)

  const match = useRouteMatch('/watchlist/:mediaType')

  useEffect(() => updateWatchlist(session_id), [])

  useEffect(() => {
    setLottieAnim1(Lottie.loadAnimation({
      container: animation1.current,
      renderer: 'svg',
      quality: 'hight',
      loop: false,
      autoplay: false,
      animationData: folder
    }))
    setLottieAnim2(Lottie.loadAnimation({
      container: animation2.current,
      renderer: 'svg',
      quality: 'hight',
      loop: false,
      autoplay: false,
      animationData: folder
    }))
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="watchlist">
          <div className="watchlist__list-select-block">
            <Link
              to="/watchlist/tv"
              onMouseOver={() => {
                lottieAnim1?.playSegments(0, 35)
              }}
              onMouseLeave={() => {
                lottieAnim1?.stop()
              }}
              className={classNames("watchlist__list-select-link", {"watchlist__list-select-link--active": match.params.mediaType === 'tv'})}
            >
              <div className="watchlist__folder-lottie" ref={animation1}></div>
              tv
            </Link>
            <Link
              to="/watchlist/movie"
              onMouseOver={() => {
                lottieAnim2?.playSegments(0, 35)
              }}
              onMouseLeave={() => {
                lottieAnim2?.stop()
              }}
              className={classNames("watchlist__list-select-link", {"watchlist__list-select-link--active": match.params.mediaType === 'movie'})}
            >
              <div className="watchlist__folder-lottie" ref={animation2}></div>
              movies
            </Link>
          </div>
          {match?.params?.mediaType === 'movie'
            ? <WatchlistList moviesList={watchlist.movie?.map((movie) => ({...movie, media_type: 'movie'}))} media_type="movie"/>
            : <WatchlistList moviesList={watchlist.tv?.map((movie) => ({...movie, media_type: 'tv'}))} media_type="tv"/>
          }
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session ,watchlist: state.session.watchlist}), {cleanAccInfo, setSessionId, updateAccInfo, updateWatchlist})(WatchlistPage)