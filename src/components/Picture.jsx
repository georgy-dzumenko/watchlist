import Lottie from 'lottie-web';
import React, { useEffect, useRef, useState } from 'react';
import { getMovieImg } from './api';
import moviePosterPlug from '../lottie/moviePosterPlug.json'
import avatar from '../lottie/avatar.json'

export const Picture = ({picture_path, w500 = false, mediaType}) => {
  const animation = useRef(null)
  const [lottieAnim, setLottieAnim] = useState(null);

  useEffect(() => {
    setLottieAnim(Lottie.loadAnimation({
      container: animation.current,
      animationData: mediaType === 'person' ? avatar : moviePosterPlug,
      loop: true,
      autoplay: false,
    }))
  }, [])

  return (
    <div
      onMouseEnter={() => lottieAnim?.play()}
      onMouseLeave={() => lottieAnim?.stop()}
      className='picture'
    >
      {picture_path
        ?
          <img className={'picture__img'} src={getMovieImg(picture_path, w500)} alt="" />
        :
          <div className={'picture__img'} ref={animation}/>
      }
    </div>
  )
}
