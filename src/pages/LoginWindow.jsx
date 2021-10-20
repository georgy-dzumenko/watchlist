import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { createSession, createToken } from '../components/api';
import { createSessionWithLogin, getAccInfo } from '../components/api';
import { setSessionId } from '../redux/actions';

const classNames = require('classnames')

const LoginWindow = ({session_id, setSessionId}) => {
  const location = useLocation()
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  const history = useHistory({});

  console.log('sid', session_id)
  console.log('ud', userData)

  useEffect(() => {
    if(session_id !== '') {
      getAccInfo(session_id).then((response) => setUserData(response))
    }
  }, [session_id])

  return (
    <form
      id="login"
      action=""
      className={classNames("login", {"login--active": location.hash === '#login'})}
      onSubmit={(event) => {
        
        if(session_id === '') {
          createToken().then((res) => {
            console.log('token', res);
            setToken(res.request_token)
  
            createSessionWithLogin(
              event.target.elements.username.value,
              event.target.elements.password.value,
              token
            )
              .then((res) => {
                createSession(res.request_token)
                  .then((response) => setSessionId(response.session_id))            
                console.log(res)
            })
          })

          return
        }

        setSessionId('')
      }}
    >
      <div className="login__title">
        {!session_id ? "Log in" : "Are you sure?"}
      </div>
      {session_id === ''
        ?
          <>
            <label htmlFor="username" className="login__label">User name</label>
            <input type="text" id="username" className="login__field"/>
            <label htmlFor="password" className="login__label">Password</label>
            <input type="password" id="password" className="login__field"/>
            <button onClick={() => history.push({hash:"#"})} type="submit" className="login__submit-button" >accept</button>
          </>
        :
          <>
            <button to="#" type="submit" className="login__log-out-button" >Log out</button>
          </>
      }
      <HashLink to="#" className="login__close-button"></HashLink>
    </form>
  )
}

export default connect((state) => ({session_id: state.session.session}), {setSessionId})(LoginWindow)