// libraries imports
import React from 'react';

// local imports
import './Notification.css';
import Button from '../Button';

function Notification({ message, onClick, onConfirmDelete }) {
    return (
        <div class="notification is-warning">
            <button class="delete" onClick={onClick}/>
            <span>{message}</span>
            <Button
                className={'button is-danger is-rounded confirm'}
                text={'Delete'} 
                onClick={onConfirmDelete}
            />
        </div>
    );
}

export default Notification;