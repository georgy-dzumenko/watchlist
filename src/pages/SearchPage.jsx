import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { SearchPageCheckbox } from '../components/SearchPageCheckbox';

const classNames = require('classnames');

export const SearchPage = () => {
  const history = useHistory();
  
  return (
    <div className="page">
      <div className="container">
        <div className="grid">
          <div className="search-page__genres grid__item--1-2">
            <SearchPageCheckbox text="genres" list={[{value: 'drama', text:"drama", id:1}, {value: 'drama', text:"drama", id:1}]}/>
          </div>
          <input type="text" className="search-page__search grid__item--3-12" />
        </div>
      </div>
    </div>
  )
}

