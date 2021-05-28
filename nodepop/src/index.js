// libraries imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

// local imports
import './index.css';
import storage from './utils/storage.js';
import { configureClient } from './api/client.js';
import Root from './Root.js';
import configureStore from './store';

const accessToken = storage.get('token');
configureClient(accessToken);

const history = createBrowserHistory();
const store = configureStore({ 
  preloadedState: { auth: !!accessToken },
  history
});

const render = () => {
  ReactDOM.render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
  );
};

render();
