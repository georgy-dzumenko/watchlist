import './styles/App.scss';
import {Navigation} from './components/Navigation'
import { Menu } from './components/Menu';
import {getMoviesByYear} from './components/api'
import { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import { MoviePage } from './pages/MoviePage';
import { Info } from './pages/Info'
import { Home } from './pages/Home'
import { CollectionPage } from './pages/CollectionPage';
import { PersonCard } from './components/PersonCard';
import { PersonPage } from './pages/PersonPage';

function App() {
  const match = useRouteMatch('/movie/:movieId')
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getMoviesByYear("2021").then((data) => setMoviesList(data));
  }, [])

  return (
    <div className="App">
      <Navigation/>

      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/info">
        <Info/>
      </Route>
      <Route path="/movies/:movieId" exact>
        <MoviePage id={match?.params?.movieId}/>
      </Route>
      <Route path="/people/:personId" exact>
        <PersonPage id={match?.params?.personId}/>
      </Route>
      <Route path="/collections/:collectionId" exact>
        <CollectionPage/>
      </Route>
      
      <Menu />
    </div>
  );
}

export default App;
