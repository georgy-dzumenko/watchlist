import React from 'react'
import { NavigationDropdown } from "./NavigationDropdown"
import { NavigationSearch } from './NavigationSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="navigation">
      <div className="container">
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

          <div className="navigation__logo">
            PMDb
          </div>
          <div className="navigation__main">
            <NavigationDropdown text="film catalogue"/>
            <a href="#" className="navigation__link">
              <div className="navigation__link-text">
                watchlist
              </div>
            </a>
          </div>
          <NavigationSearch></NavigationSearch>
        </div>  
      </div>
    </div>
  )
}