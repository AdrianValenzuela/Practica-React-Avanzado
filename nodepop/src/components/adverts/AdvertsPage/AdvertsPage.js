// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import { Layout } from '../../layout';
import { FiltersForm } from '../../filters';
import { Button } from '../../shared';
import AdvertsList from './AdvertsList.js';
import { getAdverts } from '../../../store/selectors.js';
import { advertsLoadAction, tagsLoadAction } from '../../../store/actions.js';

function EmptyList() {
    return (
        <div>
            <p>Be the first seller!</p>
            <Link to='/advert/new'>
                <Button className={'button is-primary is-rounded'} text={'New Advert'} />
            </Link>            
        </div>
    );
}

function AdvertsPage() {
    const adverts = useSelector(getAdverts);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // pedimos los anuncios al back con filtros iniciales
        dispatch(advertsLoadAction());
        // pedimos los tags al back
        dispatch(tagsLoadAction());
    }, []);

    return (
        <div>
            <Layout >
                <FiltersForm />
                <div className='ads'>
                    { adverts.length ? <AdvertsList adverts={adverts} /> : <EmptyList /> }
                </div>                
            </Layout>
        </div>
    );
}

export default AdvertsPage;