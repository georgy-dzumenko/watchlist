import React, { useEffect, useRef, useState } from 'react'
import addToListLottie from '../lottie/addToListLottie.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addMovieToList, createList, getLists } from './api';
import { motion } from 'framer-motion';
import { updateLists } from '../redux/actions';

const classNames = require('classnames')

const AddToListButton = ({session_id, accInfo, lists, media_id, media_type, watchlist, updateLists}) => {
  const [active, setActive] = useState(false);
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const [createNewActive, setNewActive] = useState(false);
  const [newListData, setNewListData] = useState({});

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(addToListLottie))
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])

  useEffect(() => {
    console.log(lists)
  }, [lists])

  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      if(active) {
        console.log('s')
        lottieAnim?.playSegments([79, 125], true)
      } else {
        console.log('b')
        lottieAnim?.playSegments([0, 1], true)
      }
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  useEffect(() => {
    
  }, [active])

  return (
    <>
      <div
        onClick={() => {
          console.log(lists)
          if(lottieAnim?.playSegments) {
            lottieAnim?.playSegments([0, 125], true)
          }
          setActive(!active)
          // addMovieToList(1, media_id, session_id)
          // .then(() => {
          //   updateLists(session_id)
          // })
        }}
        className="addToWatchListButton"
        ref={animation}
      >
      </div>
      {active &&
        <div className="add-to-list-window">
          <div className="add-to-list-window__header">
            <div className="add-to-list-window__close-button" onClick={() => setActive(false)}></div>
            <a className="add-to-list-window__create-list-button" onClick={() => setNewActive(!createNewActive)}>create new list</a>
          </div>
          <div className="add-to-list-window__content">
            <div className="add-to-list-window__title">
              {!createNewActive
                ? "select list"
                : "create list"
              }
            </div>
            {createNewActive
              ?
                <motion.div
                  initial={{opacity: 0, translateX: -100}}
                  animate={{opacity: 1, translateX: 0}}
                  transition={{ duration: 0.2}}
                >
                  <form onSubmit={(event) => {
                    console.log(newListData)
                    createList(newListData.name, newListData.description, session_id)
                    
                    updateLists(session_id)
                    setNewActive(false);
                  }}>
                    <input
                      value={newListData.name}
                      onChange={(event) => {
                        setNewListData({...newListData, name: event.target.value})
                      }}
                      className="add-to-list-window__input"
                      type="text"
                    />
                    <input
                      value={newListData.description}
                      onChange={(event) => {
                        setNewListData({...newListData, description: event.target.value})
                      }}
                      className="add-to-list-window__input"
                      type="textfield"
                    />
                    <button className="add-to-list-window__submit-button" type="submit">Create</button>
                  </form>
                </motion.div>
              :
                <ul className="add-to-list-window__list">
                  {lists.map((list) => (
                    <li
                      onClick={() => {
                        addMovieToList(list.id, media_id, session_id)
                        updateLists(session_id)
                      }}
                      key={list.id}
                      className="add-to-list-window__list-element"
                    >
                      {list.name}
                    </li>
                  ))}
                </ul>
            }
          </div>
        </div>
      }
    </>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
    accInfo: state.session.accInfo,
    lists: state.session.lists
  }),
  {updateLists}
)(AddToListButton)
