import React from 'react'
import { Link } from 'react-router-dom';
import { getMovieImg } from './api'

const classNames = require("classnames");

export const PersonCard = ({person}) => {
  return (
    <Link
      to={`/people/${person.id}`}
      className={classNames("person-card")}
    >
      <img src={getMovieImg(person.profile_path, true)} alt="" className="person-card__img"/>
      <div className="person-card__job">
        {person.job || person.character}
      </div>
      <div className="person-card__name">
        {person.name}
      </div>
    </Link>
  )
}