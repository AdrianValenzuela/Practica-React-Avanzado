// libraries imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// local imports
import './index.css';
import App from './App';
import storage from './utils/storage.js';
import { configureClient } from './api/client.js';

const accessToken = storage.get('token');
configureClient(accessToken);

ReactDOM.render(
  <Router>
    <App isInitiallyLogged={!!accessToken} />
  </Router>,
  document.getElementById('root')
);
