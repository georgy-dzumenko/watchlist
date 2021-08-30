import React, { useState } from 'react'
import "../styles/blocks/navigation.scss"

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
          <div className="navigation__dropdown-option">
            <div className="navigation__link-text">
              aasfadfsdfsa
            </div>
          </div>
          <div className="navigation__dropdown-option">
            <div className="navigation__link-text">
              aasfadfsdfsa
            </div>
          </div>
        </div>
      </div>
    </>
  )
}