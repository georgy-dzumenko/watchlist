import './styles/App.scss';
import {Navigation} from './components/Navigation'
import { Menu } from './components/Menu';
import {getMoviesByYear} from './components/api'
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'
import { Info } from './pages/Info'

function App() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getMoviesByYear("2021").then((data) => setMoviesList(data));
  }, [])

  return (
    <div className="App">
      <Navigation/>

      <Route path="/info">
        <Info/>
      </Route>
      {/* <ul>
        {moviesList.map(({title}) => <li>{title}</li>)}
      </ul> */}
      <Menu />
    </div>
  );
}

export default App;
