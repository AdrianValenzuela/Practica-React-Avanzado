// libraries imports
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isLogged, ...props }) => {
  const routeProps = isLogged
    ? props
    : {
        children: ({ location }) => (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ),
      };
  return <Route {...routeProps} />;
};

export default PrivateRoute;