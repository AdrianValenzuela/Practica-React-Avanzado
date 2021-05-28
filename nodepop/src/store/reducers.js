// local imports
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_FILTERED_REQUEST,
    ADVERTS_FILTERED_SUCCESS,
    ADVERTS_CREATED_REQUEST,
    ADVERTS_CREATED_SUCCESS,
    ADVERTS_DETAIL_REQUEST,
    ADVERTS_DETAIL_SUCCESS,
    ADVERTS_DELETED_REQUEST,
    ADVERTS_DELETED_SUCCESS,
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

        case AUTH_LOGOUT_SUCCESS:
            return false;

        default:
            return state;
    }
};

export function adverts(state = initialState.adverts, action) {
    switch (action.type) {
        case ADVERTS_LOADED_SUCCESS:
        case ADVERTS_FILTERED_SUCCESS:
            return { ...state, loaded: true, data: action.payload }

        case ADVERTS_CREATED_SUCCESS:
        case ADVERTS_DETAIL_SUCCESS:
            return { ...state, loaded: false, data: [...state.data, action.payload] };

        case ADVERTS_DELETED_SUCCESS:
            return { ...state, loaded: false }; // no hace falta cargar data, puesto que loaded está a false y redirigimos a / -> los cargará siempre que eliminemos

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
        case AUTH_LOGOUT_REQUEST:
        case ADVERTS_LOADED_REQUEST:
        case ADVERTS_FILTERED_REQUEST:
        case ADVERTS_CREATED_REQUEST:
        case ADVERTS_DETAIL_REQUEST:
        case ADVERTS_DELETED_REQUEST:
        case TAGS_LOADED_REQUEST:
            return { ...state, loading: true, error: null };

        case AUTH_LOGIN_SUCCESS:
        case AUTH_LOGOUT_SUCCESS:
        case ADVERTS_LOADED_SUCCESS:
        case ADVERTS_FILTERED_SUCCESS:
        case ADVERTS_CREATED_SUCCESS:
        case ADVERTS_DETAIL_SUCCESS:
        case ADVERTS_DELETED_SUCCESS:
        case TAGS_LOADED_SUCCESS:
            return { ...state, loading: false, error: null };

        case UI_RESET_ERROR:
            return { ...state, error: null };
        
        default:
            return state;
    }
};