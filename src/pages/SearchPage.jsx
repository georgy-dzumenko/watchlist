import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { discoverMedia, getGenres, getMoviesByTitle } from '../components/api';
import { SearchPageCheckbox } from '../components/SearchPageCheckbox';
import { SearchPageCrewFilter } from '../components/SearchPageCrewFilter';
import { FilterVisibilityToggler } from '../components/FilterVisibilityToggler';
import Lottie from 'lottie-web';
import search from '../lottie/search.json'
import { useHistory, useLocation } from 'react-router';
import { MovieCard } from "../components/MovieCard";

export const SearchPage = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [genres, setGenres] = useState([]);
  const animation = useRef(null)
  const [lottieAnim, setLottieAnim] = useState({})
  const [query, setQuery] = useState(searchParams.get('with_keywords') || '')
  const [selectedMediaType, selectMediaType] = useState(searchParams.get('media_type') || '')

  const [resultArr, setResultArr] = useState([])

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
  }, [])

  const applyQuery = useCallback(debounce((value) => {
    if(value.trim() !== '') {
      if(!searchParams.get('with_keywords')) {
        searchParams.append('with_keywords', value);
      }else {
        searchParams.set('with_keywords', value);
      }
    } else {
      searchParams.delete('with_keywords');
    }
    history.push({search: searchParams.toString()})
  }, 500), [location]);

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
    setLottieAnim(Lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: search
    }))
  }, [])
  
  return (
    <div className="page">
      <div className="container">
        <div className="grid">
          <div className="search-page__filters-block grid__item--1-4">
            <fieldset className="search-page__media-type-select-fieldset">
              <div className="search-page__media-type-select">
                <input
                  type="radio"
                  id="tv"
                  name="mediaType"
                  checked={selectedMediaType === 'tv'}
                  className="search-page__media-type-radio"
                  onChange={() => {
                    searchParams.set('media_type', 'tv')
                    selectMediaType('tv')
                    history.push({search: searchParams.toString()})
                  }}
                />
                <label className="search-page__media-type-radio-label" htmlFor="tv"> TV series</label>
              </div>
              <div className="search-page__media-type-select">
                <input
                  type="radio"
                  id="movie"
                  name="mediaType"
                  checked={selectedMediaType === 'movie'}
                  className="search-page__media-type-radio"
                  onChange={() => {
                    searchParams.set('media_type', 'movie')
                    selectMediaType('movie')
                    history.push({search: searchParams.toString()})
                  }}
                />
                <label className="search-page__media-type-radio-label" htmlFor="movie">Movie</label>
              </div>
            </fieldset>
            <div className="search-page__filter">
            </div>
            <div className="search-page__filter">
              <SearchPageCheckbox text="genres" list={genres}/>
            </div>
          </div>
          <div className="grid__item--5-12">
            <div className="search-page__search">
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  applyQuery(event.target.value)
                }}
                type="text"
                className="search-page__search-input"
              />
              <div
                onClick={() => {
                  if(lottieAnim.playSegments) {
                    lottieAnim.playSegments([0, 21], true)
                  }
                    console.log('genres', query.split(' '))
                    getMoviesByTitle(query, selectedMediaType)
                      .then((filteredByTitle) => {
                        const selectedGenres =  searchParams?.get('genres')?.split(',')?.slice(1);
                        console.log(filteredByTitle, selectedGenres)
                        if(selectedGenres) {
                          setResultArr(filteredByTitle?.filter((el) => selectedGenres.slice(1).every((genre) => el.genre_ids.some((id) => +genre === +id))))
                        } else {
                          setResultArr(filteredByTitle)
                        }
                      })

                    console.log(resultArr)
                }}
                ref={animation}
                className="search-page__search-button"
              ></div>
            </div>
            <div className="search-page__results-container">
              {resultArr?.map((movie) => (
                <MovieCard movie={{...movie, media_type: selectedMediaType}} genres={genres}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

