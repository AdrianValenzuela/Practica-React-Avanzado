// libraries imports
import React from 'react';
import { useHistory } from 'react-router-dom'

// local imports
import NewAdvertForm from './NewAdvertForm';
import './NewAdvertPage.css';
import { Layout } from '../../layout';
import { ErrorMessage } from '../../shared';
import advertsService from '../../../api/adverts.js'; 

function NewAdvertPage({ isLogged, onLogout }) {

    const [tags, setTags] = React.useState([]);
    React.useEffect(() => {
        // pedimos los tags al back
        advertsService.getAdvertsTags().then(setTags);
    }, []);

    const history = useHistory();

    const [error, setError] = React.useState(null);
    const resetError = () => {
        setError(null);
    }

    const handleSubmit = async (newAdvert, photo) => {
        resetError();
        try {
            let data = new FormData();
            data.append("name", newAdvert.name);
            data.append("price", newAdvert.price);
            data.append("sale", newAdvert.sale);
            data.append("tags", newAdvert.tags);
            
            if (photo.length) {
                data.append("photo", new Blob([photo[0]], {type: 'multipart/form-data' }));
            }

            const response = await advertsService.createAdvert(data);
            history.push(`/advert/${response.id}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout isLogged={isLogged} onLogout={onLogout}>
            <div>
                <span className='title'>New Product</span>
                <NewAdvertForm tags={tags} onSubmit={handleSubmit}/>
            </div>
            {error && <ErrorMessage message={error} onClick={resetError}/>}
        </Layout>
    );
}

export default NewAdvertPage;