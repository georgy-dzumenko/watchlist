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


import { changeLanguage } from '../redux/actions'
import { translate } from './translate'

const Navigation = ({accInfo, language, changeLanguage}) => {
  const location = useLocation();
  const menuAnimation = useAnimation();
  const avatarAnimation = useAnimation();
  const languageAnim = useAnimation();
  console.log(location)
  const [firstload, setFirstLoad] = useState(true);

  useEffect(() => {
    if(!firstload) {
      window.location.reload()
    }

    setFirstLoad(false)
  }, [language]);

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
                {translate({
                  'en': "info",
                  "uk": 'інформація'
                })}
              </div>
              {location.pathname === '/info' && <ActiveLine/>}
            </Link>
            <Link to="/search" className="navigation__link">
              <div className="navigation__link-text">
                {translate({
                  'en': "search",
                  "uk": 'пошук'
                })}
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
                {translate({
                  'en': "log in",
                  "uk": 'увійти'
                })}
              </div>
            </HashLink>
          }
          {accInfo.id &&
            <motion.div
              className="navigation__avatar-container"
              onHoverStart={() => {
                menuAnimation.start({scale: '100%', opacity: 1})
                avatarAnimation.start({scale: '120%'})
              }}
              onHoverEnd={() => {
                menuAnimation.start({scale: 0, opacity: 0})
                avatarAnimation.start({scale: '100%'})
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
                <motion.div
                  onHoverStart={() => {languageAnim.start({scale: "100%"})}}
                  onHoverEnd={() => {languageAnim.start({scale: 0})}}
                  to='/watchlist/tv'
                  className="profile-settings__option"
                >
                  ‹ {translate({
                    'en': "language",
                    "uk": 'мова'
                  })}
                  <motion.div
                    initial={{scale: 0, translateX: "-100%"}}
                    animate={languageAnim}
                    className="profile-settings__backdrop-content"
                  >
                    <div onClick={() => {changeLanguage('en')}} className="profile-settings__option">
                      english {language === 'en' && "✓"}
                    </div>
                    <div onClick={() => {changeLanguage('uk')}}className="profile-settings__option">
                      українська {language === 'uk' && "✓"}
                    </div>
                  </motion.div>
                </motion.div>
                <div className="profile-settings__label">
                  {translate({
                    'en': "account",
                    "uk": 'аккаунт'
                  })}
                </div>
                <Link to='/watchlist/tv'className="profile-settings__option">
                  {translate({
                    'en': "profile",
                    "uk": 'профіль'
                  })}
                </Link>
                <HashLink to='#login'className="profile-settings__option">
                  {translate({
                    'en': "log out",
                    "uk": 'вийти'
                  })}
                </HashLink>
                <div className="profile-settings__label">
                  {translate({
                    'en': "film catalogues",
                    "uk": 'каталоги фільмів'
                  })}
                </div>
                <Link to='/watchlist/tv'className="profile-settings__option">
                  {translate({
                    'en': "watchlist",
                    "uk": '"до перегляду"'
                  })}
                </Link>
                <Link to='/favorites/tv'className="profile-settings__option">
                  {translate({
                    'en': "favorites",
                    "uk": 'улюблені'
                  })}
                </Link>
                <Link to='/lists'className="profile-settings__option profile-settings__option--last">
                  {translate({
                    'en': "lists",
                    "uk": 'списки'
                  })}
                </Link>
              </motion.div>
              <motion.img
                initial={{ scale: '100%' }}
                animate={avatarAnimation}
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

export default connect((state) => ({accInfo: state.session.accInfo, language: state.session.language}), {changeLanguage})(Navigation)