import React, { useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom';
import { getPerson, getPersonImg, getPersonsCredits } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'

export const PersonPage = () => {
  const match = useRouteMatch("/people/:personId");
  const [credits, setCredits] = useState([]);
  const [person, setPerson] = useState({})
  const location = useLocation();

  useEffect(() => {
    getPerson(match.params.personId).then((response) => setPerson(response));
    getPersonsCredits(match.params.personId).then((response) => setCredits(response));
  }, [location, match.params.personId])

  return (
    <div className="page">
      <div className="container">
        <div className="person-page grid">
          <div className="person-page__poster grid__item--1-4">
            <img src={getPersonImg(person.profile_path)} className="person-page__poster-img" alt=""></img>
          </div>
          <div className="grid__item--5-12">
            <h1 className="person-page__name">
              {person.name}
            </h1>
            <div className="person-page__params">
              <div className="person-page__param">
                <div>
                  known for
                </div>
                <div/>
                <div>
                  {person.known_for_department}
                </div>
              </div>
              <div className="person-page__param">
                <div>
                  born
                </div>
                <div/>
                <div>
                  {person.birthday}
                </div>
              </div>
              {person.deathday &&
                <div className="person-page__param">
                  <div>
                    died
                  </div>
                  <div/>
                  <div>
                    {person.deathday}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="person-page__biography grid__item--1-12">
            <h2 className="person-page__section-title">
              Biography
            </h2>
            <div className="person-page__biography-main">
              {person.biography}
            </div>
          </div>
          <div className="grid__item--1-12">
            <h2 className="person-page__section-title">
              Acting
            </h2>
            <div>
              <MoviesSlider moviesList={credits.cast} />
            </div>
          </div>
          {
            Object.entries(
              credits.crew?.reduce((prev, cur) => ({
                filtered: {
                  [cur.job]: prev.full.filter((e) => e.job === cur.job),
                  ...prev.filtered,
                },
                full: prev.full.filter((e) => e.job !== cur.job)
              }), {full: credits.crew}).filtered || {}
            ).sort((a, b) => b[1].length - a[1].length).map((movie) => (
              <div className="grid__item--1-12">
              <h2 className="person-page__section-title">
                {movie[0]}
              </h2>
              <div>
                <MoviesSlider moviesList={movie[1]} />
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}