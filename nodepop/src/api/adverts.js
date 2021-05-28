// local imports
import client from './client.js';

const advertsBaseURL = '/v1/adverts';

const advertsService = {
    getAdverts: function(filters) {
        let url = '';
        
        if (filters.name) {
            url += `name=${filters.name}&`;
        }

        if (filters.sale && !filters.purchase) {
            url += 'sale=true&';
        } else if (!filters.sale && filters.purchase) {
            url += 'sale=false&';
        }

        if (filters.minPrice && !filters.maxPrice) {
            url += `price=${filters.minPrice}&`;
        } else if (filters.maxPrice && !filters.minPrice) {
            url += `price=0&price=${filters.maxPrice}&`;
        } else if (filters.minPrice && filters.maxPrice) {
            url += `price=${filters.minPrice}&price=${filters.maxPrice}&`;
        }

        if (filters.tags && filters.tags.length > 0) {
            filters.tags.forEach(tag => {
                url += `tags=${tag}&`;
            });
        }

        if (url) {
            return client.get(`${advertsBaseURL}?${url}`);
        }

        return client.get(advertsBaseURL);
        
    },

    getAdvertDetail: function(id) {
        const url = `${advertsBaseURL}/${id}`;
        return client.get(url);
    },

    getAdvertsTags: function() {
        const url = `${advertsBaseURL}/tags`;
        return client.get(url);
    },

    createAdvert: function(advert) {
        return client.post(advertsBaseURL, advert);
    },

    deleteAdvert: function(id) {
        const url = `${advertsBaseURL}/${id}`;
        return client.delete(url);
    }
};

export default advertsService;