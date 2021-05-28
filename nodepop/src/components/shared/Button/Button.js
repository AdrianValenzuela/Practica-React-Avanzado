// libraries imports
import React from 'react';

// local imports
import './Button.css';

function Button({ className, text, ...props }) {
    return (
        <button 
            className={className}
            {...props}
        >
            {text}
        </button>
    );
}

export default Button;