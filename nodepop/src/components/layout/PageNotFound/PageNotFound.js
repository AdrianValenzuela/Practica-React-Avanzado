// libraries imports
import React from 'react'

// local imports
import Layout from '../Layout';
import './PageNotFound.css';

function PageNotFound({ ...props }) {
    return (
        <Layout {...props}>
            <div className='notFound'>
            404 | Page not found
            </div>
        </Layout>
    );
}

export default PageNotFound