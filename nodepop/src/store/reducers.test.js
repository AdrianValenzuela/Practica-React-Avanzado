import { adverts, initialState } from './reducers';
import { ADVERTS_FILTERED_SUCCESS } from './types';

describe('adverts', () => {
    test('should manage ADVERTS_FILTERED_SUCCESS action', () => {
        const state = initialState.adverts;
        const action = { 
            type: ADVERTS_FILTERED_SUCCESS,
            payload: []
        };
        const nextState = adverts(state, action);
        const expectedState = {
            ...initialState.adverts, 
            loaded: true, 
            data: action.payload
        };

        expect(nextState).toStrictEqual(expectedState);
    });
});