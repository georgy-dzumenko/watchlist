import React, { useCallback, useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router';
import { getCollection, getMovieImg, getMoviesByYear } from '../components/api'
import { MoviesSlider } from '../components/MoviesSlider';
import { Poster } from '../components/Poster';

export const CollectionPage = () => {
  const match = useRouteMatch('/collections/:collectionId')
  const [collection, setCollection] = useState({})

  useEffect(() => {
    getCollection(match.params.collectionId).then((response) => setCollection(response))
  }, [])
  
  return (
    <div className="page">
      <div className="container">
        <div className="collections-page grid">
          <div className="collections-page__poster grid__item--1-2">
            <img src={getMovieImg(collection.poster_path, true)} className="collections-page__poster-img"></img>
          </div>
          <div className="page__title grid__item--3-12">
            {collection.name}
          </div>
        </div>
      </div>
    </div>
  )
}