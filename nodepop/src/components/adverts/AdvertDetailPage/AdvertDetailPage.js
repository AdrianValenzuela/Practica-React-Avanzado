// libraries imports
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

// local imports
import advertsService from '../../../api/adverts.js';
import { Layout } from '../../layout';
import { Button, Notification } from '../../shared';
import './AdvertDetailPage.css';

function AdvertDetailPage({ ...props }) {
    const [advert, setAdvert] = React.useState(null)
    const [error, setError] = React.useState(null);

    React.useEffect(() =>{
        const { match } = {...props};
        advertsService.getAdvertDetail(match.params.id).then(advert => {
            setAdvert(advert);
        }).catch(error => {
            setError(error);
        });
    }, []);

    if (error) {
        return <Redirect to='/404' />
    }

    return (
        <Layout { ...props }>
            {advert && <AdvertDetails advert={advert} />}
        </Layout>
        
    );
}

function AdvertDetails({ advert }) {

    const defaultImage = 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png'

    const [notification, setNotification] = React.useState(null);

    const history = useHistory();

    const handleDelete = () => {
        setNotification('Are you sure?');
    };

    const handleConfirmDelete = () => {
        setNotification(null);
        advertsService.deleteAdvert(advert.id).then(history.push('/'));
    }

    const resetNotification = () => {
        setNotification(null);
    }

    return (
        <div className='details'>
            <span className='title'>{advert.name}</span>
            <div className='advert-details'>
                <img className='advert-image' src={advert.photo ? `http://localhost:3001${advert.photo}` : defaultImage} />
                <div className='advert'>
                    <span>{`Price: ${advert.price}`}</span>
                    <span>{`Status: ${advert.sale ? 'Sale' : 'Purchase'}`}</span>
                    <span>{`Tags: ${advert.tags}`}</span>
                </div>
            </div>
            <div className='delete-button'>
                <Button 
                    className={'button is-danger is-rounded'}
                    text={'Delete'}
                    onClick={handleDelete}                    
                />
            </div>
            {notification && <Notification message={notification} onClick={resetNotification} onConfirmDelete={handleConfirmDelete} />}            
        </div>
    );
}

export default AdvertDetailPage;