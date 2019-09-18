const resolve = key => {
    const { _id, website } = key;
    if (!_id) throw new Error('El id de autor es necesario. ');
    const arcSite = key['arc-site'];
    const path = `/author/v1/author-service?website=${website ||
        arcSite}&_id=${_id}`;
    return path;
};

export default {
    resolve,
    params: {
        _id: 'text',
        website: 'text'
    }
};
