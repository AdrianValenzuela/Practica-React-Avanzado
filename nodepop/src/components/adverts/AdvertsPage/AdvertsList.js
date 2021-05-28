// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Advert from './Advert.js';
import './AdvertsList.css';

function AdvertsList({ adverts }) {

    return (
        <div className='adverts-list'>
            {adverts.map(advert => {
                return (
                    <Link to={`/advert/${advert.id}`}>
                        <Advert {...advert} />
                    </Link>
                );
            })}
        </div>
    );
}

export default AdvertsList;