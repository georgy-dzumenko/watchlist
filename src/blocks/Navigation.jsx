import React from 'react'
import "../styles/blocks/navigation.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const Navigation = () => (
  <div className="navigation">
    <div className="navigation__logo">
      PMDb
    </div>
    <div className="navigation__main">
      <a href="#" className="navigation__link">
        film TOPs
      </a>
      <a href="#" className="navigation__link">
        newest films
      </a>
      <a href="#" className="navigation__link">
        watchlist
      </a>
    </div>
    <div className="navigation__search">
      <FontAwesomeIcon icon={faSearch}/>
    </div>
  </div>
)