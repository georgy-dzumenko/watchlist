import React, { useEffect, useState } from 'react'
import { NavigationDropdown } from "./NavigationDropdown"
import { NavigationSearch } from './NavigationSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { HashRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccInfo, getPersonImg } from './api'

const Navigation = ({session_id}) => {
  const [accInfo, setAccInfo] = useState({})

  useEffect(() => {
    getAccInfo(session_id).then((res) => setAccInfo(res))
  }, [session_id])

  console.log('acc', accInfo)

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


        <Link to="/" className="navigation__logo">
          PMDb
        </Link>
        <div className="navigation__main">
          <NavigationDropdown text="film catalogue"/>
          <Link to="/info" className="navigation__link">
            <div className="navigation__link-text">
              Info
            </div>
          </Link>
          <Link to="/search" className="navigation__link">
            <div className="navigation__link-text">
              search
            </div>
          </Link>
        </div>
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
          <img src={getPersonImg(accInfo?.avatar?.tmdb?.avatar_path)} alt="" className="navigation__avatar"/>
        </div>
      </div>  
    </div>
  )
}

export default connect((state) => ({session_id: state.session.session}))(Navigation)