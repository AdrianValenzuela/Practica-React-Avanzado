// libraries imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk'; 

// local imports
import * as reducers from './reducers.js';
import authService from '../api/auth.js';
import advertsService from '../api/adverts.js';

const api = { authService, advertsService };

const configureStore = ({ preloadedState, history }) => {
    const middleware = [
        routerMiddleware(history),
        thunk.withExtraArgument({ api, history })
    ];

    const store = createStore(
        combineReducers({ ...reducers, router: connectRouter(history) }),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    return store
};

export default configureStore;