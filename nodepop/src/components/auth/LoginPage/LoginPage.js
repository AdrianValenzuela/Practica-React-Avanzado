// libraries imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import LoginForm from './LoginForm.js';
import { ReactComponent as Icon } from '../../../assets/header-logo.svg';
import './LoginPage.css';
import { ErrorMessage } from '../../shared';
import {
  loginAction,
  resetError
} from '../../../store/actions.js';
import { getUi } from '../../../store/selectors.js';

function LoginPage() {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(getUi);

    const handleSubmit = credentials => {
        dispatch(loginAction(credentials));
    };

    return (
        <div className='loginPage'>
            <Icon width="170" height="42" />
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading}/>
            {error && <ErrorMessage message={error.message} onClick={() => dispatch(resetError())}/>}
        </div>
    );
}

export default LoginPage;