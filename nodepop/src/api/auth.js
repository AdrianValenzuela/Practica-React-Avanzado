// local imports
import client, { configureClient, resetClient } from './client.js';
import storage from '../utils/storage.js';

const authService = {
    login: function(credentials) {
        return client.post('/auth/login', credentials).then(({ accessToken }) => {
            configureClient(accessToken);

            if (credentials.remember) {
                storage.set('token', accessToken);
            }            
        });
    },

    logout: function() {
        return Promise.resolve().then(() => {
            resetClient();
            storage.remove('token');
        });
    } 
}

export default authService;