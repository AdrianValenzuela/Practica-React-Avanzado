//libraries imports
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// local imports
import './App.css';
import { AdvertsPage, AdvertDetailPage, NewAdvertPage } from './components/adverts';
import { LoginPage, PrivateRoute } from './components/auth';
import { PageNotFound } from './components/layout';
import { getIsLogged } from './store/selectors.js';

function App() {

  const isLogged = useSelector(getIsLogged);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute isLogged={isLogged} path='/adverts'>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged} exact path='/advert/new'>
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged} path='/advert/:id'>
          {routeProps => <AdvertDetailPage {...routeProps}/>}          
        </PrivateRoute>
        <Route path='/login'>
          { isLogged ? <Redirect to='/' /> : <LoginPage /> }
        </Route>
        <Route exact path='/'>
          <Redirect to='/adverts' />
        </Route>        
        <Route path='/404'>
          <PageNotFound />
        </Route>
        <Route>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
