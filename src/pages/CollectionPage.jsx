import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { getCollection, getMovieImg } from '../components/api'

export const CollectionPage = () => {
  const match = useRouteMatch('/collections/:collectionId')
  const [collection, setCollection] = useState({})

  useEffect(() => {
    getCollection(match.params.collectionId).then((response) => setCollection(response))
  }, [match.params.collectionId])
  
  return (
    <div className="page">
      <div className="container">
        <div className="collections-page grid">
          <div className="grid grid__item--1-12">
            <div className="collections-page__poster grid__item--1-3">
              <img src={getMovieImg(collection.poster_path, true)} className="collections-page__poster-img" alt=""></img>
            </div>
            <div className="page__description grid__item--4-12 grid">
              <h2 className="page__title grid__item--1-12">{collection.name}</h2>
              <div className="grid__item--1-12">{collection.overview}</div>
            </div>
          </div>
          {collection?.parts?.map((part) => (
            <Link to={`/movie/${part.id}`} className="collections-page__part grid grid__item--1-12">
              <div className="collections-page__poster grid__item--1-2">
                <img src={getMovieImg(part.poster_path, true)} className="collections-page__poster-img" alt=""></img>
              </div>
              <div className="page__title grid__item--3-12">{part.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}