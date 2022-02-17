import './styles/App.scss';
import { Menu } from './components/Menu';
import { Route, useRouteMatch } from 'react-router-dom'
import MoviePage from './pages/MoviePage';
import { Info } from './pages/Info'
import Home from './pages/Home'
import { CollectionPage } from './pages/CollectionPage';
import { PersonPage } from './pages/PersonPage';
import {Switch} from 'react-router'
import { SearchPage } from './pages/SearchPage';
import LoginWindow from './pages/LoginWindow';
import Navigation from './components/Navigation'
import WatchlistPage from './pages/WatchlistPage';
import FavoritesPage from './pages/FavoritesPage';
import ListsPage from './pages/ListsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const match = useRouteMatch('/:mediaType/:mediaId')
  // const [accInfo, setAccInfo] = useState({});

  // console.log(accInfo)

  // useEffect(() => {
  //   getAccInfo().then((response) => {setAccInfo(response)})
  // }, [])

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
        <Route path="/person/:personId" exact>
          <PersonPage key={Math.random()} id={match?.params?.personId}/>
        </Route>
        <Route path="/watchlist/:mediaType" exact>
          <WatchlistPage/>
        </Route>
        <Route path="/favorites/:mediaType" exact>
          <FavoritesPage/>
        </Route>
        <Route path="/lists/:listId?" exact>
          <ListsPage/>
        </Route>
        <Route path="/:mediaId/:mediaId" exact>
          {match?.params?.mediaType !== 'collections'
            ?
            <MoviePage id={match?.params?.mediaId} key={`moviePage${match?.params?.mediaId}`}/>
            :
            <CollectionPage/>
          }
        </Route>
        <Route path="/profile" exact>
          <ProfilePage/>
        </Route>
      </Switch>
      
      <LoginWindow/>
      <Menu />
    </div>
  );
}

export default App;
