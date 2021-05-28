// libraries imports
import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import advertsService from '../../../api/adverts.js'; 
import { Layout } from '../../layout';
import { FiltersForm } from '../../filters';
import { Button } from '../../shared';
import AdvertsList from './AdvertsList.js';

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

function AdvertsPage({ ...props }) {

    const [adverts, setAdverts] = React.useState([]);
    const [tags, setTags] = React.useState([]);

    const initialFilters = {
        name: '',
        minPrice: null,
        maxPrice: null,
        sale: false,
        purchase: false,
        tags: []
    };

    const getAdverts = (filters) => {
        return advertsService.getAdverts(filters).then(adverts => {
            // ordenamos de más nuevo a más viejo
            return adverts.sort((advert1, advert2) => {
                return advert1.createdAt > advert2.createdAt ? -1 : 0;
            });
        })
    }

    const handleSubmit = async filters => {
        try {
            // pedimos los anuncios al back con filtros formulario
            await getAdverts(filters).then(setAdverts);
        } catch (error) {
            console.error(error);
        }
    };

    const filterProps = {
        initialFilters: initialFilters,
        tags: tags,
        onSubmit: handleSubmit
    };

    React.useEffect(() => {
        // pedimos los anuncios al back con filtros iniciales
        getAdverts(initialFilters).then(setAdverts);
        // pedimos los tags al back
        advertsService.getAdvertsTags().then(setTags);
    }, []);    

    return (
        <div>
            <Layout {...props} >
                <FiltersForm {...filterProps}/>
                <div className='ads'>
                    { adverts.length ? <AdvertsList adverts={adverts} /> : <EmptyList /> }
                </div>                
            </Layout>
        </div>
    );
}

export default AdvertsPage;