// libraries imports
import React from 'react';

// local imports
import './Select.css';

function Select({ tags, ...props }) {
    return (
        <div className='select-tags'>
            <label>Tags: </label>
            <select name="tags" {...props}>
                {tags.map(tag => { return  <option value={tag}>{tag}</option>})}
            </select>
        </div>
    );
}

export default Select;