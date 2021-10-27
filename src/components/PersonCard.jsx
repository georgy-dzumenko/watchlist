import Lottie from 'lottie-web';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getMovieImg } from './api'
import avatarAnim from '../lottie/avatar.json'

const classNames = require("classnames");

export const PersonCard = ({person}) => {
  const avatar = useRef({})
  const [lottieAnim, setLottieAnim] = useState(null)

  useEffect(() => {
    if(!person.profile_path) {
      setLottieAnim(Lottie.loadAnimation({
        container: avatar.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        hover: false,
        
        animationData: avatarAnim
      }))
    }
  }, [])
  return (
    <Link
      to={`/people/${person.id}`}
      onMouseOver={() => lottieAnim?.play()}
      onMouseLeave={() => lottieAnim?.stop()}
      className={classNames("person-card")}
    >
      {person.profile_path ?
        <img src={getMovieImg(person.profile_path, true)} alt="" className="person-card__img"/>
        : <div className="person-card__empty-avatar" ref={avatar}></div>
      }
      <div className="person-card__job">
        {person.job || person.character}
      </div>
      <div className="person-card__name">
        {person.name}
      </div>
    </Link>
  )
}