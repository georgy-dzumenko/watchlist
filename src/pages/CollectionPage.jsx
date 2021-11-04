import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import AddToWatchListButton from '../components/AddToWatchListButton';
import { getCollection, getMovieImg } from '../components/api'
import MarkAsFavoriteButton from '../components/MarkAsFavoriteButton';
import { Picture } from '../components/Picture';

export const CollectionPage = () => {
  const match = useRouteMatch('/collections/:collectionId')
  const history = useHistory();
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
              <div className="collections-page__poster-img">
                <Picture picture_path={collection.poster_path} mediaType="movie"/>
              </div>
            </div>
            <div className="page__description grid__item--4-12 grid">
              <h2 className="page__title grid__item--1-12">{collection.name}</h2>
              <div className="grid__item--1-12">{collection.overview}</div>
            </div>
          </div>
          {collection?.parts?.map((part) => (
            <div
              onClick={() => {
                history.push(`/movie/${part.id}`)
              }}
              className="collections-page__part grid grid__item--1-12"
            >
              <div className="collections-page__poster grid__item--1-2">
                <div className="collections-page__poster-img">
                  <Picture picture_path={part.poster_path} mediaType="movie"/>
                </div>
              </div>
              <div className="page__title grid__item--3-12">{part.title}</div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="collections-page__actions-block"
              >
                <AddToWatchListButton media_id={part.id} media_type="movie"/>
                <MarkAsFavoriteButton media_id={part.id} media_type="movie"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}