// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../../assets/header-logo.svg';

// local imports
import './Header.css';
import { Button } from '../../shared';
import { AuthButton } from '../../auth';

function Header({ isLogged, onLogout }) {
    return (
        <header className='header'>
            <Link to='/'>
                <div className='logo'>
                    <Icon width="130" height="32" />                
                </div>
            </Link>
            <nav>
                <Link to='/advert/new'>
                    <Button className={'button is-primary is-rounded'} text={'New Advert'} />
                </Link>
                <AuthButton isLogged={isLogged} onLogout={onLogout}/>
            </nav>
        </header>
    );
}

export default Header;