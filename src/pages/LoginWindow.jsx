import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { createSession, createToken, deleteSession } from '../components/api';
import { createSessionWithLogin, getAccInfo } from '../components/api';
import { cleanAccInfo, setSessionId, updateAccInfo, cleanWatchlist, updateWatchlist } from '../redux/actions';
import { motion } from 'framer-motion';

const classNames = require('classnames')

const LoginWindow = ({ session_id, setSessionId, updateAccInfo, cleanAccInfo, cleanWatchlist, updateWatchlist}) => {
  const location = useLocation()
  const [userData, setUserData] = useState({username: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(!!session_id)
  const [err, setErr] = useState('')
  const history = useHistory({});

  useEffect(() => {
    setLogged(!!session_id);
  }, [location.hash])

  return (
    <motion.div
      initial={{opacity: 0, translateX: -100}}
      animate={{opacity: 1, translateX: 0}}
      transition={{ duration: 0.2}}
      className={classNames("login", {"login--active": location.hash === '#login'})}
    >
      <form
        id="login"
        action=""
        className="login__container"
        onSubmit={(event) => {
          
          if(!session_id) {
            setLoading(true);
            createToken().then((tockenRes) => {
              createSessionWithLogin(
                userData.username,
                userData.password,
                tockenRes.request_token,
              )
                .then((res) => {
                  createSession(res.request_token)
                    .then((response) => {
                      if(response.success) {
                        history.push({hash:"#"})
                        setSessionId(response.session_id)
                        updateAccInfo(response.session_id)
                        updateWatchlist(response.session_id)
                        
                      } else {
                        setErr(response.status_message)
                      }

                      setLoading(false)
                    })
              })
            })

            return
          }
          deleteSession(session_id)
          cleanAccInfo()
          cleanWatchlist()
          setSessionId('')
        }}
      >
        <div className="login__title">
          {!isLogged ? "Log in" : "Are you sure?"}
        </div>
        <div className="login__err">
          {err}
        </div>
        {!isLogged
          ?
            <>
              {loading &&
                <lottie-player
                  src={'https://assets8.lottiefiles.com/packages/lf20_knpXLX.json'}
                  background="transparent"
                  speed="2"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    }} 
                  autoplay
                  onAnimationEnd={() => console.log('end')}
                />
              }
              {!loading &&
                <>
                  <label htmlFor="username" className="login__label">User name</label>
                  <input
                    value={userData.username}
                    onChange={(event) => setUserData({
                      ...userData,
                      username: event.target.value
                    })}
                    type="text"
                    id="username"
                    className="login__field"
                  />
                  <label htmlFor="password" className="login__label">Password</label>
                  <input
                    value={userData.password}
                    onChange={(event) => setUserData({
                      ...userData,
                      password: event.target.value
                    })}
                    type="password"
                    id="password"
                    className="login__field"
                  />
                  <button
                    onClick={() => setErr('')}
                    type="submit"
                    className="login__submit-button"
                  >
                    accept
                  </button>
                </>
              }
            </>
          :
            <>
              <button
                onClick={() => history.push({hash: '#'})}
                type="submit"
                className="login__log-out-button"
              >
                Log out
              </button>
            </>
        }
        <a onClick={() => history.push({hash: '#'})} className="login__close-button"></a>
        {!isLogged &&
          <span className="login__sign-up-field">
            Don't have an account? <a href="https://www.themoviedb.org/signup" className="login__sign-up-link">Sign up!</a>
          </span>
        }
      </form>
    </motion.div>
  )
}

export default connect(
  (state) => ({session_id: state.session.session}),
  {
    cleanWatchlist,
    cleanAccInfo,
    setSessionId,
    updateAccInfo,
    updateWatchlist
  }
)(LoginWindow)