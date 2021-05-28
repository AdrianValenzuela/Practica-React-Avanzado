// libraries imports
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isLogged, ...props }) => {
  
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;