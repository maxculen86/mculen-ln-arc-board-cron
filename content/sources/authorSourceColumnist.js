import transform from './utils/transform';

const resolve = key => {
    const { _id, website } = key;
    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];
    return `/author/v1/author-service?website=${website || arcSite}&_id=${_id}`;
};

export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    },
    transform,
    ttl: 900
};
