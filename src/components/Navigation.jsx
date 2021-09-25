import React from 'react'
import { NavigationDropdown } from "./NavigationDropdown"
import { NavigationSearch } from './NavigationSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { Link, useLocation } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__content">
        {/* elements displayed only on mobiles */}
        <HashLink
          // smooth
          scroll={(el) => el.scrollIntoView()}
          className="navigation__menu"
          to="#menu"
        >
          <FontAwesomeIcon
            icon={faBars}
          />
        </HashLink>


        <Link to="/" className="navigation__logo">
          PMDb
        </Link>
        <div className="navigation__main">
          <NavigationDropdown text="film catalogue"/>
          <Link to="/info" className="navigation__link">
            <div className="navigation__link-text">
              Info
            </div>
          </Link>
          <Link to="/search" className="navigation__link">
            <div className="navigation__link-text">
              search
            </div>
          </Link>
        </div>
        <NavigationSearch></NavigationSearch>
      </div>  
    </div>
  )
}