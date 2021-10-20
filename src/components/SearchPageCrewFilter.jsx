import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { findPerson, getPeopleArr, getPerson, getPersonImg } from './api';
import debounce from 'lodash.debounce'

export const SearchPageCrewFilter = ({queryName}) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  const onSearch = useCallback(debounce((name) => {
    findPerson(name).then((data) => setActors((data || []).slice(0, 7)))
  }, 500), [])

  useEffect(() => {
    console.log('works')
    setActors(actors.filter((el) => !searchParams.get(queryName).split(',').some((id) => id === el.id)))
  }, [searchParams.get(queryName)])

  const loadPeopleArr = async () => {
    const result = [];
    await getPeopleArr(searchParams.get(queryName)?.split(',') || []).forEach((el) => el.then((res) => {
      if(!!res.id) {
        result.push(res)
      }
    }))
    await setSelectedActors(result)
    console.log('loaded')
  }

  const addSelectedPerson = async (id) => {
    await getPerson(id).then((response) => {setSelectedActors([...selectedActors, response])})
    searchParams.set(queryName, [searchParams.get(queryName), id])
    history.push({search: searchParams.toString()})
  }

  const deleteSelectedPerson = async (id) => {
    setSelectedActors([...selectedActors].filter((el) => +id !== +el.id))
    searchParams.set(queryName, searchParams.get(queryName).split(',').filter((el) => +id !== +el))
    history.push({search: searchParams.toString()})
  }

  useEffect(() => {
    loadPeopleArr()
  }, [])



  return (
    <div className="actors-filter">
      <div className="actors-filter__input-container">
        <input
          onChange={(event) => {
            onSearch(event.target.value)
          }}
          className="actors-filter__input"
        />
        <div className="actors-filter__results-block">
          {
            actors.map((actor) => (
              <div className="actors-filter__result">
                <img src={getPersonImg(actor.profile_path, true)} alt="" className="actors-filter__result-img" />
                <div
                  onClick={() => addSelectedPerson(actor.id)}
                  className="actors-filter__add-actor"
                >
                  add actor
                </div>
              </div>
            ))
          }
        </div>

      </div>

      <div className="actors-filter__selected-actors-block">
        {selectedActors.map((actor) => (
          <div className="actors-filter__selected-actor">
            <img src={getPersonImg(actor.profile_path)} alt="" className="actors-filter__selected-actor-img" />
            <h3>{actor.name}</h3>
            <div
              onClick={() => deleteSelectedPerson(actor.id)}
              className="actors-filter__unselect-actor-button"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

