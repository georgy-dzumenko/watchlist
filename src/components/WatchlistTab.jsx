import folder from '../lottie/folder.json'
import Lottie from 'lottie-web';
import { useRouteMatch } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames')

export const WatchlistTab = ({title, titleInUrl}) => {
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)

  const match = useRouteMatch('/watchlist/:mediaType')

  useEffect(() => {
    setLottieAnim(Lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      quality: 'hight',
      loop: false,
      autoplay: false,
      animationData: folder
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim.setSpeed(2.5)
    }

  }, [])
  
  useEffect(() => {
    if(match.params.mediaType === titleInUrl && lottieAnim.playSegments) {
      lottieAnim?.playSegments([34, 90], true)
    }
    if(match.params.mediaType !== titleInUrl && lottieAnim.playSegments) {
      lottieAnim?.playSegments([0, 1], true)
    }
  }, [match.params.mediaType])
  return (
    <Link
      to={`/watchlist/${titleInUrl}`}
      onMouseOver={() => {
        if(match.params.mediaType !== titleInUrl) {
          lottieAnim?.playSegments([21, 34], true)
        }
      }}
      onMouseLeave={() => {
        if(match.params.mediaType !== titleInUrl) {
          lottieAnim?.playSegments([0, 1], true)
        }
      }}
      className={classNames("watchlist__list-select-link", {"watchlist__list-select-link--active": match.params.mediaType === titleInUrl})}
    >
      <div className="watchlist__folder-lottie" ref={animation}></div>
      {title}
    </Link>
  )
}