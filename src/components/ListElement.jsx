import React from 'react'
import { getMovieImg } from './api'
import { useHistory } from 'react-router';
import AddToWatchListButton from './AddToWatchListButton';
import { connect } from 'react-redux';
import { Picture } from './Picture';

const classNames = require("classnames");

const ListElement = ({ movie, genres, media_type}) => {
  const history = useHistory();
  return (
    <div
      // to={`/${movie.media_type}/${movie.id}`}
      className={classNames("list-card")}
    >
      <div className="list-card__img">
        <Picture picture_path={movie.poster_path}/>
      </div>
      <div className="list-card__title">
        {movie.title}
      </div>
      {/* <div className="watchlist__remove-from-watchlist-block">
        <AddToWatchListButton media_id={movie.id} media_type={media_type} />
      </div> */}
      <div className="list-card__action-button-container">
        
      </div>
    </div>
  )
}

export default connect((state) => ({genres: state.session.genres}))(ListElement)