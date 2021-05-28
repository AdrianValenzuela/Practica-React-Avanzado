// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import { Button } from '../../shared';
import authService from '../../../api/auth.js';

function AuthButton({ isLogged, onLogout }) {

    const handleLogoutClick = () => {
        authService.logout().then(onLogout);
    };

    const isLoggedProps = {
        onClick: handleLogoutClick,
        text: 'Log out'
    };

    const notLoggedProps = {
        text: 'Log in'
    }

    const props = isLogged ? isLoggedProps : notLoggedProps;


    if (isLogged) {
        return <Button className={'button is-danger is-rounded'} {...props} />
    } else {
        return (
            <Link to='/login'>
                <Button className={'button is-info is-rounded'} {...props} />
            </Link>
        );
    }
}

export default AuthButton;