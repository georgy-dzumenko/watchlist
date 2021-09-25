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
import {Switch} from 'react-router'
import { SearchPage } from './pages/SearchPage';

function App() {
  const match = useRouteMatch('/:mediaType/:mediaId')
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    setMoviesList(getMoviesByYear("2021"))
  }, [])

  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <Route name="app" path="/" exact>
          <Home/>
        </Route>
        <Route name="app" path="/search" exact>
          <SearchPage/>
        </Route>
        <Route path="/info">
          <Info/>
        </Route>
        <Route path="/people/:personId" exact>
          <PersonPage id={match?.params?.personId}/>
        </Route>
        <Route path="/:mediaId/:mediaId" exact>
          {match?.params?.mediaType !== 'collections'
            ?
            <MoviePage id={match?.params?.mediaId}/>
            :
            <CollectionPage/>
          }
        </Route>
        {/* <Route path="/collections/:collectionId" exact>
          
        </Route> */}
      </Switch>
      
      <Menu />
    </div>
  );
}

export default App;
