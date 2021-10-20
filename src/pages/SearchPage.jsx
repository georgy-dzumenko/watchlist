import React, { useEffect, useState } from 'react'
import { getGenres } from '../components/api';
import { SearchPageCheckbox } from '../components/SearchPageCheckbox';
import { SearchPageCrewFilter } from '../components/SearchPageCrewFilter';
import { FilterVisibilityToggler } from '../components/FilterVisibilityToggler';

export const SearchPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
  }, [])
  
  return (
    <div className="page">
      <div className="container">
        <div className="grid">
          <div className="search-page__filters-block grid__item--1-4">
            <div className="search-page__filter">
              <FilterVisibilityToggler
                title="actors filter"
                filter={<SearchPageCrewFilter queryName="actors"/>}
              />
            </div>
            {/* <div className="search-page__filter">
              fsdla
              <SearchPageCrewFilter queryName="crew"/>
            </div>
            <div className="search-page__filter">
              <SearchPageCheckbox text="genres" list={genres}/>
            </div> */}
          </div>
          <input type="text" className="search-page__search grid__item--5-12" />
        </div>
      </div>
    </div>
  )
}

