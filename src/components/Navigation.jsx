import React, { useEffect, useState } from 'react'
import { NavigationDropdown } from "./NavigationDropdown"
import { NavigationSearch } from './NavigationSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccInfo, getPersonImg } from './api'
import { AnimateSharedLayout, motion, useAnimation } from 'framer-motion'

const Navigation = ({accInfo}) => {
  const location = useLocation();
  const menuAnimation = useAnimation();
  const AvatarAnimation = useAnimation();
  console.log(location)

  return (
    <div className="navigation">
      <div className="navigation__content">
        {/* elements displayed only on mobiles */}
        <HashLink
          // smooth
          scroll={(el) => el.scrollIntoView()}
          className="navigation__menu"
          to="#menu"
        >
          <FontAwesomeIcon
            icon={faBars}
          />
        </HashLink>

        <AnimateSharedLayout>
          <Link to="/" className="navigation__logo">
            PMDB
            {location.pathname === '/' && <ActiveLine/>}
          </Link>
          <div className="navigation__main">
            <Link to="/info" className="navigation__link">
              <div className="navigation__link-text">
                info
              </div>
              {location.pathname === '/info' && <ActiveLine/>}
            </Link>
            <Link to="/search" className="navigation__link">
              <div className="navigation__link-text">
                search
              </div>
              {location.pathname === '/search' && <ActiveLine/>}
            </Link>
          </div>
        </AnimateSharedLayout>
        <div className="navigation__right-side-block">
          <NavigationSearch></NavigationSearch>
          {!accInfo.id &&
            <HashLink   
              to="#login"
              className="navigation__link--paddingless"
            >
              <div className="navigation__link-text">
                log in
              </div>
            </HashLink>
          }
          {accInfo.id &&
            <motion.div
              className="navigation__avatar-container"
              onHoverStart={() => {
                menuAnimation.start({scale: '100%', opacity: 1})
                AvatarAnimation.start({scale: '120%'})
              }}
              onHoverEnd={() => {
                menuAnimation.start({scale: 0, opacity: 0})
                AvatarAnimation.start({scale: '100%'})
              }}
            >
              <motion.div
                initial={{scale: 0, opacity: 0}}
                className="profile-settings"
                animate={menuAnimation}
              >
                <div className="profile-settings__header">
                  {accInfo.username}
                </div>
                <div className="profile-settings__label">
                  account
                </div>
                <Link to='/watchlist/tv'className="profile-settings__option">
                    profile
                </Link>
                <HashLink to='#login'className="profile-settings__option">
                    log out
                </HashLink>
                <div className="profile-settings__label">
                  film catalogues
                </div>
                <Link to='/watchlist/tv'className="profile-settings__option">
                    watchlist
                </Link>
                <Link to='/favorites/tv'className="profile-settings__option">
                    favorites
                </Link>
                <Link to='/lists'className="profile-settings__option">
                    lists
                </Link>
              </motion.div>
              <motion.img
                initial={{ scale: '100%' }}
                animate={AvatarAnimation}
                src={getPersonImg(accInfo?.avatar?.tmdb?.avatar_path)}
                alt=""
                className="navigation__avatar"
              />
            </motion.div>
          }
        </div>
      </div>  
    </div>
  )
}

function ActiveLine() {
  return (
    <motion.div
      layoutId="activeLine"
      style={{
        width: '100%',
        height: '4px',
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgb(255, 0, 0)'
      }}
      transition={{duration: 0.2}}
    />
  )
}

export default connect((state) => ({accInfo: state.session.accInfo}))(Navigation)