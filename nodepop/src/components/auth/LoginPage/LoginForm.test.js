import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import LoginForm from './LoginForm';
import { loginAction } from '../../../store/actions';
import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from '../../../store/types';

const createStore = extraArgument => state => {
  const middleware = [thunk.withExtraArgument(extraArgument)];
  const mockStore = configureStore(middleware);
  const store = mockStore(state);
  return store;
};

describe('LoginForm', () => {
    const props = {
        isLoading: false,
        onSubmit: jest.fn(),
    };

    const history = {
      location: {},
      replace: jest.fn(),
    };

    const api = {
      authService: { login: jest.fn().mockResolvedValue() },
    };

    const store = createStore({ api, history })();

    const render = () => shallow(<LoginForm {...props} />);
    
    test('snapshot testing', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });


    test('test component and store', async () => {
        const credentials = {
            email: '', 
            password: '',
            remember: false
        };
        
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
        
        const form = wrapper.find('form');
        form.simulate('submit', { preventDefault: () => {} });

        expect(props.onSubmit).toHaveBeenCalledWith(credentials);

        await store.dispatch(loginAction(credentials));
        const actions = store.getActions();
        expect(actions).toEqual([
            { type: AUTH_LOGIN_REQUEST },
            { type: AUTH_LOGIN_SUCCESS },
        ]);
        expect(api.authService.login).toBeCalledWith(credentials);
    });
});