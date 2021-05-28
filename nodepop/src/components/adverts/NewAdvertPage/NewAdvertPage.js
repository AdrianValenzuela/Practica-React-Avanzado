// libraries imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import NewAdvertForm from './NewAdvertForm';
import './NewAdvertPage.css';
import { Layout } from '../../layout';
import { ErrorMessage } from '../../shared';
import { advertsCreatAction, resetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import { tagsLoadAction } from '../../../store/actions';

function NewAdvertPage() {
    const dispatch = useDispatch();
    const { error } = useSelector(getUi);

    React.useEffect(() => {
        // pedimos los tags
        dispatch(tagsLoadAction());
    }, []);

    const handleSubmit = async (newAdvert, photo) => {
        dispatch(advertsCreatAction(newAdvert, photo));
    };

    return (
        <Layout>
            <div>
                <span className='title'>New Product</span>
                <NewAdvertForm onSubmit={handleSubmit}/>
            </div>
            {error && <ErrorMessage message={error} onClick={() => dispatch(resetError())}/>}
        </Layout>
    );
}

export default NewAdvertPage;