// libraries imports
import React from 'react';

// local imports
import LoginForm from './LoginForm.js';
import { ReactComponent as Icon } from '../../../assets/header-logo.svg';
import './LoginPage.css';
import authService from '../../../api/auth.js';
import { ErrorMessage } from '../../shared';

function LoginPage({ onLogin }) {

    const [isLoading, setIsLoading] = React.useState(false);
    
    const [error, setError] = React.useState(null);
    const resetError = () => {
        setError(null);
    }


    const handleSubmit = async credentials => {
        resetError();
        setIsLoading(true);
        try {            
            await authService.login(credentials);
            setIsLoading(false);
            onLogin();
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className='loginPage'>
            <Icon width="170" height="42" />
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading}/>
            {error && <ErrorMessage message={error} onClick={resetError}/>}
        </div>
    );
}

export default LoginPage;