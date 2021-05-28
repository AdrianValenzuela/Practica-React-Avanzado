//libraries imports
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local imports
import './App.css';
import { AdvertsPage, AdvertDetailPage, NewAdvertPage } from './components/adverts';
import { LoginPage, PrivateRoute } from './components/auth';
import { PageNotFound } from './components/layout';

function App({ isInitiallyLogged }) {

  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);
  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Switch>
        <PrivateRoute isLogged={isLogged} path='/adverts'>
          <AdvertsPage isLogged={isLogged} onLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged} exact path='/advert/new'>
          <NewAdvertPage isLogged={isLogged} onLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged} path='/advert/:id'>
          {routeProps => <AdvertDetailPage isLogged={isLogged} onLogout={handleLogout} {...routeProps}/>}          
        </PrivateRoute>
        <Route path='/login'>
          { isLogged ? <Redirect to='/' /> : <LoginPage onLogin={handleLogin} /> }
        </Route>
        <Route exact path='/'>
          <Redirect to='/adverts' />
        </Route>        
        <Route path='/404'>
          <PageNotFound isLogged={isLogged} onLogout={handleLogout} />
        </Route>
        <Route>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
