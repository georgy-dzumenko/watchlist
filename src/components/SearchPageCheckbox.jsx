import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
const classNames = require('classnames');

export const SearchPageCheckbox = ({text, list}) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [isOpened, open] = useState(false);

  const selectNewOption = (id) => {
    searchParams.set(text, [searchParams.get(text), id])
    history.push({ search: searchParams.toString() })
  }
  
  const cencelOption = (id) => {
    const result = searchParams.get(text)?.split(',').filter((optionId) => optionId !== '' && +optionId !== id);
    console.log('result ', result)
    if(result.length === 0) {
      searchParams.delete(text)
    } else {
      searchParams.set(text, result)
    }
    history.push({ search: searchParams.toString() })
  }

  return (
    <div className="checkbox">
      <div
        onClick={() => { open(!isOpened) }}
        className="checkbox__options-switcher"
      >
        <div className={classNames("checkbox__options-switcher-text", {"checkbox__options-switcher-text--active": isOpened})}>
          {text}
        </div>
      </div>
      <div className={"checkbox__options-block"}>
        {
          list.map(({id, name}) => (
            <div
              onClick={() => {
                if(searchParams.get(text)?.split(',').some((optionId) => +optionId === id)) {
                  cencelOption(id);
                  return;
                }
                selectNewOption(id)
              }}
              className={classNames(["checkbox__option", {"checkbox__option--active": searchParams.get(text)?.split(',').some((optionId) => +optionId === id)}])}
              key={id}
            >
              {name}
            </div>
          ))
        }
      </div>
    </div>
  )
}
