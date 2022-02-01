import transform from './utils/transform';

const resolve = key => {
    const { website, last } = key;
    const arcSite = key['arc-site'];

    return `/author/v2/author-service?website=${website ||
        arcSite}&last=${last || ''}`;
};

export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    },
    transform,
    ttl: 600
};
