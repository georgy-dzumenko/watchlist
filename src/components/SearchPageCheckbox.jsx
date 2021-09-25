import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getMovieImg, getMoviesById, getSimilar, getTrailer } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'

const classNames = require('classnames');

export const SearchPageCheckbox = ({text, list}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpened, open] = useState(false);

  const selectNewOption = (id) => {
    setSelectedOptions([...selectedOptions, list.find(({optionId}) => id === optionId)])
  }

  const cencelOption = (id) => {
    setSelectedOptions([...selectedOptions, list.find(({optionId}) => id === optionId)])
  }

  return (
    <div className="checkbox">
      <div
        onClick={() => { open(!isOpened) }}
        className="checkbox__options-switcher"
      >
        {text}
      </div>
      <div className={classNames("checkbox__options-block", {"checkbox__options-block--active": isOpened})}>
        {
          list.map(({value, id, text}) => (
            <div
              onClick={() => {selectNewOption(id)}}
              className="checkbox__option"
              key="id"
            >
              {text}
            </div>
          ))
        }
      </div>
    </div>
  )
}
