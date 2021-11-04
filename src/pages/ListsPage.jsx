import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { useHistory, useRouteMatch } from 'react-router';
import { getCreatedList } from '../components/api';
import ListElement from '../components/ListElement';
import MovieCard from '../components/MovieCard';

const classNames = require('classnames')

const ListsPage = ({lists}) => {
  const history = useHistory();
  const match = useRouteMatch('/lists/:listId?')
  const [selectedList, selectList] = useState([]);

  return (
    <div className="page">
      <div className="container">
        <div className="lists-page grid">
          <div className="lists-page__select-section grid__item--1-4">
            {lists.map((list) => (
              <div
                key={list.id}
                className="lists-page__list-option"
                onClick={() => {
                  history.push(`/lists/${list.id}`)
                  getCreatedList(list.id).then((res) => {
                    console.log(res.items)
                    selectList(res.items)
                  })
                }}
              >
                {list.name}
              </div>
            ))}
          </div>
          <div className="lists-page__list grid__item--5-12">
            {selectedList.map((movie) => (
              <ListElement movie={movie}/>
            ))

            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session, lists: state.session.lists}), {})(ListsPage)