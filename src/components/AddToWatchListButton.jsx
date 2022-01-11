import React, { useEffect, useRef, useState } from 'react'
import addButton from '../lottie/addButton.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addToWatchlist, getWatchlist } from './api';
import { updateWatchlist } from '../redux/actions';
import { Link } from 'react-router-dom';

const classNames = require('classnames')

const AddToWatchListButton = ({session_id, accInfo, media_id, media_type, watchlist, updateWatchlist}) => {
  const [active, setActive] = useState(!watchlist[media_type]?.some(({id}) => +media_id === id));
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(addButton))
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])
  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      if(active) {
        console.log('s')
        lottieAnim?.playSegments([194, 195], true)
      } else {
        console.log('b')
        lottieAnim?.playSegments([115, 116], true)
      }
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  useEffect(() => {
    if(lottieAnim.playSegments) {
      if(active) {
        lottieAnim?.playSegments([141, 195], true)
      } else {
        lottieAnim?.playSegments([46, 116], true)
      }
    }
  }, [active])

  return (
    <div
      onClick={() => {
        setActive(!active)
        addToWatchlist({session_id, account_id: accInfo.id, media_type, media_id, watchlist: active})
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
    watchlist: state.session.watchlist
  }),
  {updateWatchlist}
)(AddToWatchListButton)
