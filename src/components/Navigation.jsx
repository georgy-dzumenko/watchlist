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
import { AnimateSharedLayout, motion } from 'framer-motion'

const Navigation = ({session_id}) => {
  const [accInfo, setAccInfo] = useState({})
  const location = useLocation();
  console.log(location)

  useEffect(() => {
    getAccInfo(session_id).then((res) => setAccInfo(res))
  }, [session_id])

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
            <NavigationDropdown text="film catalogue"/>
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
          <HashLink
            to="#login"
            className="navigation__link"
          >
            <div className="navigation__link-text">
              {session_id
                ? 'log out'
                : 'log in'
              }
            </div>
          </HashLink>
          {session_id ?
            <img
              src={getPersonImg(accInfo?.avatar?.tmdb?.avatar_path)}
              alt=""
              className="navigation__avatar"
            />
            : ''
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

export default connect((state) => ({session_id: state.session.session}))(Navigation)