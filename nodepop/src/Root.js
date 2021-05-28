// libraries imports
import React from 'react';
import { Provider} from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// local imports
import App from './App.js';

function Root({ store, history }) {

    return (
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
}

export default Root;