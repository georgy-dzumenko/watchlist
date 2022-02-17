import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { createSession, createToken, deleteSession } from '../components/api';
import { createSessionWithLogin, getAccInfo } from '../components/api';
import { cleanAccInfo, setSessionId, updateAccInfo, cleanWatchlist, updateWatchlist, updateLists } from '../redux/actions';
import { motion } from 'framer-motion';
import { translate } from '../components/translate';

const classNames = require('classnames')

const LoginWindow = ({ session_id, setSessionId, updateAccInfo, cleanAccInfo, cleanWatchlist, updateWatchlist, updateLists}) => {
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
                        updateLists(response.session_id)
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
          {!isLogged ? translate({"en": "Log in", "uk": "Увійти"}) : translate({"en": "Are you sure?", "uk": "Ви впевнені?"})}
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
                  <label htmlFor="username" className="login__label">{translate({"en": "Username", "uk": "Ім'я користувача"})}</label>
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
                  <label htmlFor="password" className="login__label">{translate({"en": "Password", "uk": "Пароль"})}</label>
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
                    {translate({
                      'en': "accept",
                      "uk": 'прийняти'
                    })}
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
                {translate({
                  'en': "Log out",
                  "uk": 'вийти'
                })}
              </button>
            </>
        }
        <a onClick={() => history.push({hash: '#'})} className="login__close-button"></a>
        {!isLogged &&
          <span className="login__sign-up-field">
            {translate({
              'en': "Don't have an account?",
              "uk": 'Не маєте аккаунта?'
            })} <a href="https://www.themoviedb.org/signup" className="login__sign-up-link">{translate({
              'en': "Sign up!",
              "uk": 'Зареєструйтесь!'
            })}</a>
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
    updateWatchlist,
    updateLists
  }
)(LoginWindow)