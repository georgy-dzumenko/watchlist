import React, { useState } from 'react'
import "../styles/blocks/navigation.scss"
import { Link } from 'react-router-dom';

const classNames = require("classnames");

export const NavigationDropdown = ({text}) => {
  const [isActive, setActive] = useState(false); 

  return (
    <>
      <div
        className={classNames(
          "navigation__dropdown",
          {"navigation__dropdown--active": isActive}
        )}
        onClick={() => setActive(!isActive)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="navigation__link-text">
          {text}
        </div>
        <div className={classNames("navigation__dropdown-options-block", {"navigation__dropdown-options-block--active": !isActive})}>
          <Link to='/watchlist/tv'className="navigation__dropdown-option">
            <div className="navigation__link-text">
              watchlist
            </div>
          </Link>
          <Link to='/favorites/tv'className="navigation__dropdown-option">
            <div className="navigation__link-text">
              favorites
            </div>
          </Link>
          <Link to='/lists'className="navigation__dropdown-option">
            <div className="navigation__link-text">
              lists
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}