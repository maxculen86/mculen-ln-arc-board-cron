const resolve = key => {
    const { id, website, size } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}`;
};
export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    }
};
