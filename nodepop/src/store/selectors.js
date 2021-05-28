export const getIsLogged = state => state.auth;

export const getUi = state => state.ui;

export const getAdvertsLoaded = state => state.adverts.loaded;

export const getAdverts = state => 
    state.adverts.data.sort((t1, t2) => {
       if (t1.updatedAt < t2.updatedAt) return 1;
       return -1; 
    });

export const getTagsLoaded = state => state.tags.loaded;

export const getTags = state => state.tags.data;
