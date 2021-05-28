// local imports
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    ADVERTS_FILTERED_REQUEST,
    ADVERTS_FILTERED_SUCCESS,
    ADVERTS_FILTERED_FAILURE,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,
    TAGS_LOADED_FAILURE,
    UI_RESET_ERROR
} from './types';
import { getAdvertsLoaded, getTagsLoaded } from './selectors.js';

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST
    };
};

export const authLoginSuccess = () => {
    return {
        type: AUTH_LOGIN_SUCCESS
    };
};

export const authLoginFailure = (error) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: error,
        error: true
    };
};

export const loginAction = (credentials) => {
    return async function (dispatch, getState, { api, history }) {
        dispatch(authLoginRequest());
        try{
            await api.authService.login(credentials);
            dispatch(authLoginSuccess());

            //Redirect
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);
        } catch (error) {
            dispatch(authLoginFailure(error));
        }
    };
};

export const authLogoutRequest = () => {
    return {
        type: AUTH_LOGOUT_REQUEST
    };
};

export const authLogoutSuccess = () => {
    return {
        type: AUTH_LOGOUT_SUCCESS
    };
};

export const authLogoutFailure = (error) => {
    return {
        type: AUTH_LOGOUT_FAILURE,
        payload: error,
        error: true
    };
}

export const logoutAction = () => {
    return async function (dispatch, getState, { api, history }) {
        dispatch(authLogoutRequest());
        try {
            await api.authService.logout();
            dispatch(authLogoutSuccess());
        } catch (error) {
            dispatch(authLogoutFailure(error));
        }
    };
};

export const advertsLoadedRequest = () => {
    return {
        type: ADVERTS_LOADED_REQUEST
    };
};

export const advertsLoadedSuccess = (adverts) => {
    return {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts
    };
};

export const advertsLoadedFailure = (error) => {
    return {
        type: ADVERTS_LOADED_FAILURE,
        payload: error,
        error: true
    };
};

export const advertsLoadAction = (filters = {}) => {
    return async function (dispatch, getState, { api }) {
        const advertsLoaded = getAdvertsLoaded(getState());
        if (advertsLoaded) {
            return;
        }

        dispatch(advertsLoadedRequest());
        try{
            const adverts = await api.advertsService.getAdverts(filters);
            dispatch(advertsLoadedSuccess(adverts));
        } catch (error) {
            dispatch(advertsLoadedFailure(error));
        }
    };
};

export const advertsFilteredRequest = () => {
    return {
        type: ADVERTS_FILTERED_REQUEST
    };
};

export const advertsFilteredSuccess = (filters) => {
    return {
        type: ADVERTS_FILTERED_SUCCESS,
        payload: filters
    };
};

export const advertsFilteredFailure = (error) => {
    return {
        type: ADVERTS_FILTERED_FAILURE,
        payload: error,
        error: true
    };
};

export const advertsFilterAction = (filters) => {
    return async function (dispatch, getState, { api }) {
        dispatch(advertsFilteredRequest());
        try{
            const adverts = await api.advertsService.getAdverts(filters);
            dispatch(advertsFilteredSuccess(adverts));
        } catch (error) {
            dispatch(advertsFilteredFailure(error));
        }
    };
};

export const tagsLoadedRequest = () => {
    return {
        type: TAGS_LOADED_REQUEST
    };
};

export const tagsLoadedSuccess = (tags) => {
    return {
        type: TAGS_LOADED_SUCCESS,
        payload: tags
    };
};

export const tagsLoadedFailure = (error) => {
    return {
        type: TAGS_LOADED_FAILURE,
        payload: error,
        error: true
    };
};

export const tagsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
        const tagsLoaded = getTagsLoaded(getState());
        if (tagsLoaded) {
            return;
        }

        dispatch(tagsLoadedRequest());
        try {
            const tags = await api.advertsService.getAdvertsTags();
            dispatch(tagsLoadedSuccess(tags));
        } catch (error) {
            dispatch(tagsLoadedFailure);
        }
    };
};

export const resetError = () => {
    return {
        type: UI_RESET_ERROR
    };
};