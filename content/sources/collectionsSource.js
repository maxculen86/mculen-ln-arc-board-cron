const resolve = key => {
    //Llamado desde chain
    //en la key viene { id: 'OCTOV4V54FCFLJHOVB5IAJKHHM', 'arc-site': 'la-nacion-ar' }
    //Consultar porque en collectionSource pasa size y para que sirve ese dato
    //Voy a usar momentanamente la v2
    const { id, size, website } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}`;
};
const ttlValue = () => {
    const properties = getProperties('la-nacion-ar');
    const value = properties.ttlConfig.authorSource.ttl;
    return value;
};

export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    }
};
