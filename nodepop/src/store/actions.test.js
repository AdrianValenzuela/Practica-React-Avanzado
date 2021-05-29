import { advertsLoadedSuccess, loginAction } from './actions';
import { 
    ADVERTS_LOADED_SUCCESS, 
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './types';

describe('advertsLoadedSuccess', () => {
    test('should return a ADVERTS_LOADED_SUCCESS action', () => {
        const adverts = 'adverts';
        const expectedAction = {
            type: ADVERTS_LOADED_SUCCESS,
            payload: adverts
        };

        const result = advertsLoadedSuccess(adverts);
        expect(result).toEqual(expectedAction);
    });
});

describe('loginAction', () => {
    describe('when login api resolve', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const api = { 
            authService: { login: jest.fn().mockResolvedValue() }
        };
        const history = {
            location: {},
            replace: jest.fn()
        };

        test('should dispatch a AUTH_LOGIN_REQUEST action', () => {
            action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
        });

        test('should call api.auth.login', () => {
            action(dispatch, getState, { api, history });
            expect(api.authService.login).toHaveBeenCalledWith(credentials);
        });

        test('should dispatch a AUTH_LOGIN_SUCCESS action', async () => {
            await action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
        });

        test('should redirect to /', async () => {
            await action(dispatch, getState, { api, history });
            expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
        });
    });

    describe('when login api throws', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const error = 'Unauthorized';
        
        test('should dispatch a AUTH_LOGIN_FAILURE action', async () => {
            const api = { 
                authService: { login: jest.fn().mockRejectedValue(error) }
            };
            const expectValue = {
                type: AUTH_LOGIN_FAILURE,
                payload: error,
                error: true
            };
            await action(dispatch, getState, { api });
            expect(dispatch).toHaveBeenNthCalledWith(2, expectValue);
        });
    });
});