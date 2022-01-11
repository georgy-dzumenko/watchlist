import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { useHistory, useRouteMatch } from 'react-router';
import { getCreatedList } from '../components/api';
import ListElement from '../components/ListElement';
import { motion, useAnimation } from 'framer-motion';
import { ListSelector } from '../components/ListSelector';

const classNames = require('classnames')

const ListsPage = ({lists}) => {
  const history = useHistory();
  const match = useRouteMatch('/lists/:listId?')
  const [selectedList, selectList] = useState({});
  const animation = useAnimation();

  useEffect(() => {
    getCreatedList(match.params.listId).then((res) => {
      selectList(res)
    })
    console.log('a', selectedList)
    if(match.params.listId === selectedList.id) {
      animation.start({
        translateX: 20
      })
    } else {
      animation.start({
        translateX: 0
      })
    }
  }, [match.params.listId])

  return (
    <div className="page">
      <div className="container">
        <div className="lists-page grid">
          <div className="lists-page__select-section grid__item--1-4">
            {lists.map((list) => (
              <ListSelector key={list.id} id={list.id} name={list.name}/>
            ))}
          </div>
          <div className="lists-page__list grid__item--5-12">
            <h1 className="lists-page__title">{selectedList.name}</h1>
            <p className="lists-page__description">{selectedList.description}</p>
            <div className="lists-page__list">
              {selectedList.items?.map((movie) => (
                <ListElement movie={movie}/>
              ))}
            </div>
            <div className="lists-page__delete-button">
              delete the list
            </div>
          </div>
        </div>
      </div>
      <div className="lists-page__window">dfsdfsdf</div>
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session, lists: state.session.lists}), {})(ListsPage)