// TODO: limpieza OTT - Borrar en iteración 3 de 5 (antes, validar que no se use en algun lugar activo en PB)
const resolve = key => {
    const { website } = key;
    if (!website) throw new Error('Debe indicar el website - Section Source');
    return `/site/v3/website/${website}/section/`;
};

export default {
    resolve,
    schemaName: 'sections-schema',
    params: {
        website: 'text'
    },
    ttl: 900
};
