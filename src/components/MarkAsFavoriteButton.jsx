import React, { useEffect, useRef, useState } from 'react'
import favorite from '../lottie/favorite.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { markAsFavorite } from './api';
import { updateFavoritesList } from '../redux/actions';

const MarkAsFavoriteButton = ({session_id, accInfo, media_id, media_type, favorites, updateFavoritesList}) => {
  const [active, setActive] = useState(!favorites[media_type]?.some(({id}) => +media_id === id));
  const [lottieAnim, setLottieAnim] = useState({})
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const animation = useRef(null)

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(favorite)),
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])

  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      if(active) {
        lottieAnim.playSegments([0, 1], true)
      } else {
        lottieAnim.playSegments([33, 34], true)
      }
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  useEffect(() => {
    if(lottieAnim.playSegments) {
      if(active) {
        lottieAnim?.playSegments([0, 1], true)
      } else {
        lottieAnim?.playSegments([0, 34], true)
      }
    }
  }, [active])

  return (
    <div
      onClick={() => {
        setActive(!active)
        markAsFavorite({session_id, account_id: accInfo.id, media_type, media_id, favorite: active})
          .then(() => {
            updateFavoritesList(session_id)
          })
      }}
      className="mark-as-favorite"
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
  {updateFavoritesList}
)(MarkAsFavoriteButton)
