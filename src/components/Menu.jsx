import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'

const classNames = require("classnames")

export const Menu = () => {
  const location = useLocation()

  return (
    <div id="menu" className={classNames("menu", {"menu--active": location.hash === "#menu"})}>
    
      <div className="navigation">
        <div className="navigation__content">
          <HashLink
            smooth to="#"
            className="menu__close-button"
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </HashLink>
        </div>
      </div>
      <div className="container">
        <h1 className="menu__title">
          Menu
        </h1>
        <ul className="menu__main">
          <li className="menu__main-item">
            <HashLink className="menu__link" to="/">
              home
            </HashLink>
          </li>
          <li className="menu__main-item">
            <HashLink className="menu__link" to="/info">
              info
            </HashLink>
          </li>
          <li className="menu__main-item">
            <a className="menu__link" href="#info">
              adsadfs
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}