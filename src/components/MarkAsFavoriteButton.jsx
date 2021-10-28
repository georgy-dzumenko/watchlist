import React, { useEffect, useRef, useState } from 'react'
import favorite from '../lottie/favorite.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { markAsFavorite } from './api';
import { updateWatchlist } from '../redux/actions';

const MarkAsFavoriteButton = ({session_id, accInfo, media_id, media_type, favorites, updateWatchlist}) => {
  const [active, setActive] = useState(!favorites[media_type]?.some(({id}) => +media_id === id));
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: favorite
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])
  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      if(active) {
        lottieAnim?.playSegments([0, 1], true)
      } else {
        lottieAnim?.playSegments([131, 131], true)
      }
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  useEffect(() => {
    if(lottieAnim.playSegments) {
      if(active) {
        lottieAnim?.playSegments([0, 1], true)
      } else {
        lottieAnim?.playSegments([61, 131], true)
      }
    }
  }, [active])

  return (
    <div
      onClick={() => {
        setActive(!active)
        markAsFavorite({session_id, account_id: accInfo.id, media_type, media_id, favorite: active})
          .then(() => {
            updateWatchlist(session_id)
          })
      }}
      className="addToWatchListButton"
      ref={animation}
    >
    </div>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
    accInfo: state.session.accInfo,
    favorites: state.session.favorites
  }),
  {updateWatchlist}
)(MarkAsFavoriteButton)
