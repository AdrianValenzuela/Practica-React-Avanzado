// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import { Button } from '../../shared';
import { logoutAction } from '../../../store/actions.js';
import { getIsLogged } from '../../../store/selectors';

function AuthButton() {

    const isLogged = useSelector(getIsLogged);
    const dispatch = useDispatch();

    const isLoggedProps = {
        onClick: () => dispatch(logoutAction()),
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