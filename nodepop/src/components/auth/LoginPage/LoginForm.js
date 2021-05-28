// libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import { Button, FormField, Checkbox } from '../../shared';

function LoginForm({ onSubmit, isLoading }) {
 
    const [credentials, setCredentials] = React.useState({ email: '', password: '', remember: false });
    const handleFormFieldChange = event => {
        setCredentials(credentials => {
            return {
                ...credentials,
                [event.target.name]: event.target.type === 'remember' ? event.target.checked : event.target.value
            };
        });
    };

    const handleSubmitLoginForm = event => {
        event.preventDefault();
        onSubmit(credentials);
    };

    return (
        <form onSubmit={handleSubmitLoginForm}>
            <FormField 
                className={'input is-primary'} 
                type={'text'} 
                name={'email'}
                placeholder={'email'}
                value={credentials.email}
                onChange={handleFormFieldChange}
            />
            <FormField
                className={'input is-primary'} 
                type={'password'} 
                name={'password'}
                placeholder={'password'}
                value={credentials.password}
                onChange={handleFormFieldChange}
            />
            <Checkbox 
                className={'checkbox login-checkbox'}
                name={'remember'}
                type={'checkbox'}
                text={'Remember me'}
                disabled={!credentials.email || !credentials.password}
                checked={credentials.remember}
                onChange={handleFormFieldChange}
            />
            <Button 
                className={'button is-primary is-rounded'} 
                text={'Log in'}
                disabled={isLoading || !credentials.email || !credentials.password}
            />
        </form>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

LoginForm.defaultProps = {
    isLoading: false
};

export default LoginForm;