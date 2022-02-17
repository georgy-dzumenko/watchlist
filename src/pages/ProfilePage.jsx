import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { getPerson, getPersonImg, getPersonsCredits } from '../components/api';

const PersonPage = ({accInfo}) => {

  return (
    <div className="page">
      <div className="container">
        <div className="grid">
          <div className="grid__item--1-3 profile-page__avatar-container">
            <motion.img
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              src={getPersonImg(accInfo?.avatar?.tmdb?.avatar_path)}
              alt=""
              className="profile-page__avatar"
            >
            </motion.img>
          </div>
          <motion.div
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            className="grid__item--4-12 profile-page__description"
          >
            <motion.div
              className="profile-page__username grid"
            >
              {accInfo.username}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({accInfo: state.session.accInfo}))(PersonPage)
