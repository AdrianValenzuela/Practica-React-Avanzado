// libraries imports
import React from 'react';

function FormField({ className, ...props }) {
    return (
        <input
            className = {className}
            {...props}
        />
    );
}

export default FormField;