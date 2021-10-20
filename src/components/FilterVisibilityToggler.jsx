import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
const classNames = require('classnames');

export const FilterVisibilityToggler = ({filter, title}) => {
  const [isOpened, open] = useState(false);

  return (
    <div
      className={
        classNames([
          "search-page__filter-visibility-toggler",
          {"search-page__filter-visibility-toggler--active": isOpened}
        ])
      }
      
    >
      <div
        className={
          classNames([
            "search-page__filter-visibility-toggler-text",
            {"search-page__filter-visibility-toggler-text--active": isOpened}
          ])
        }
        onClick={() => open(!isOpened)}
      >
        {title}
      </div>
      <div
        className={classNames([
          "search-page__filter-visibility-toggler-content",
          {"search-page__filter-visibility-toggler-content--active": isOpened}
        ])}
      >
        {filter}
      </div>
    </div>
  )
}
