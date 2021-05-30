import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
    const props = {
        isLoading: false,
        onSubmit: jest.fn(),
    };


    const render = () => shallow(<LoginForm {...props} />);
    
    test('snapshot testing', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });
});