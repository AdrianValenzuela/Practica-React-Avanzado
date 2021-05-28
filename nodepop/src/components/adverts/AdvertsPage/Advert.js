// libraries imports
import React from 'react';

// local imports
import './Advert.css';

function Advert({ name, price, sale, photo, tags }) {

    return (
        <article>
            <div className='card'>
                <div className='card-content'>
                    <div className='card-content-header'>
                        <span className='title advert-name'>{name}</span>
                    </div>
                    <div className='card-content-info'>
                        <span className='advert-price'>{`Price: ${price}`}</span>
                        <span className='advert-sale'>{sale ? 'Sale' : 'Purchase'}</span>
                        <span className='advert-tags'>{`Tags: ${tags}`}</span>
                        {photo && <img src={photo} alt=''/>}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Advert;