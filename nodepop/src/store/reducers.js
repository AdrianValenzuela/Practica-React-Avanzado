// local imports
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,
    UI_RESET_ERROR
} from './types';

const initialState = {
    auth: false,
    adverts: {
        loaded: false,
        data: []
    },
    tags: {
        loaded: false,
        data: []
    },
    ui: {
        loading: false,
        error: null
    }
};

export function auth(state = initialState.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true;

        default:
            return state;
    }
};

export function adverts(state = initialState.adverts, action) {
    switch (action.type) {
        case ADVERTS_LOADED_SUCCESS:
            return { ...state, loaded: true, data: action.payload }

        default:
            return state
    }
};

export function tags(state = initialState.tags, action) {
    switch (action.type) {
        case TAGS_LOADED_SUCCESS:
            return { ...state, loaded: true, data: action.payload }

        default:
            return state
    }
};

export function ui(state = initialState.ui, action) {
    if (action.error) {
        return { ...state, loading: false, error: action.payload };
    }

    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case ADVERTS_LOADED_REQUEST:
        case TAGS_LOADED_REQUEST:
            return { ...state, loading: true, error: null };

        case AUTH_LOGIN_SUCCESS:
        case ADVERTS_LOADED_SUCCESS:
        case TAGS_LOADED_SUCCESS:
            return { ...state, loading: false, error: null };

        case UI_RESET_ERROR:
            return { ...state, error: null };
        
        default:
            return state;
    }
};