// libraries import
import React from 'react';

function Checkbox({ className, text, ...props }) {

    const [name, type, disabled, checked, onChange] = Object.values({...props});

    return (
        <label 
            className={className}
            disabled={disabled}
        >
            <input 
                type={type}
                disabled={disabled}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            {text}
        </label>
    );
}

export default Checkbox;