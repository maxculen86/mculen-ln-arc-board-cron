const resolve = key => {
    const { id } = key;
    const arcSite = key['arc-site'];
    if (!id) throw Error('Id de galeria es requerido');

    return `/content/v4/galleries?website=${arcSite}
    &_id=${id}`;
};

export default {
    resolve,
    params: {
        id: 'text'
    }
};
