// libraries imports
import React from 'react';

// local imports
import './ErrorMessage.css';

function ErrorMessage({ message, onClick }) {
    return (
        <div className={'notification is-danger is-light'}>
            <button className='delete' onClick={onClick}/>
            {message}
        </div>
    );
}

export default ErrorMessage;