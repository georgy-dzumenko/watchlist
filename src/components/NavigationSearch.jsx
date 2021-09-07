import React, { useCallback, useRef, useState } from 'react'
import "../styles/blocks/navigation.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash.debounce'
import { getMovieImg, getMoviesByTitle } from './api'
import { Link } from 'react-router-dom'

const classNames = require("classnames")

export const NavigationSearch = () => {
  const [isActive, setActive] = useState(false);
  const [results, setResluts] = useState([]);
  const [text, setText] = useState("");

  const input = useRef(null)

  const onSearch = useCallback(debounce((title) => {
    getMoviesByTitle(title).then((data) => setResluts((data || []).slice(0, 7)))
  }, 500), [])

  return (
    <>
      <div
        className="navigation__search"
      >
        <input
          ref={input}
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            onSearch(event.target.value)
            console.log("a");
          }}
          onBlur={() => setActive(false)}
          className={
            classNames(
              "navigation__search-input",
              {"navigation__search-input--active": isActive}
            )
          }
        >
        </input>
        <div
          onClick={() => {
            if(isActive === false) {
              setActive(true)
              input.current.focus()
            }else {
              setActive(false)
            }
          }}
          className={classNames("navigation__search-icon", {"navigation__search-icon--active": isActive})}
        >
          <FontAwesomeIcon
            icon={faSearch}
          />
        </div>
        <ul className={classNames("navigation__search-results-block", {"navigation__search-results-block--active": (text && isActive)})}>
          {
            <>
              {
                results.map(result => (
                  <li key={result.id}>
                    <Link to={`/movies/${result.id}`} className="navigation__search-result">
                      <img src={getMovieImg(result.poster_path, true)} alt="" className="navigation__search-result-img" />
                      <h2 className="navigation__search-result-title">
                        {result.title}
                      </h2>
                    </Link>
                  </li>
                ))
              }
              {
                results.length > 0 ?
                  <li key={"end"} className="navigation__search-more-results">
                    more results...
                  </li>
                :
                  <li key={"end"} className="navigation__search-no-results">
                    no results
                  </li>
              }
            </>
          }
        </ul>
      </div>
    </>
  )
}