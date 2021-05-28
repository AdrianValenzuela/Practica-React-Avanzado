// libraries imports
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// local imports
import advertsService from '../../../api/adverts.js';
import { Layout } from '../../layout';
import { Button, Notification } from '../../shared';
import './AdvertDetailPage.css';
import { getUi, getAdvertDetail } from '../../../store/selectors';
import { advertsDetailAction } from '../../../store/actions';

class AdvertDetailPage extends React.Component {
    componentDidMount() {
        const { match, onLoad } = this.props;
        onLoad(match.params.id);
    }

    render() {
        const { advert, error } = this.props;
        
        if (error) {
            return <Redirect to='/404' />
        }

        return (
            <Layout>
                {advert && <AdvertDetails advert={advert} />}
            </Layout>        
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
  advert: getAdvertDetail(state, ownProps.match.params.id),
  ...getUi(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: advertId => dispatch(advertsDetailAction(advertId))
});


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

// export default AdvertDetailPage;
export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetailPage);