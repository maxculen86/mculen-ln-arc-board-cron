import getProperties from 'fusion:properties';

const resolve = key => {
    const { website } = key;
    if (!website) throw new Error('Debe indicar el website - Section Source');
    return `/site/v3/website/${website}/section/`;
};

const ttlValue = () => {
    const properties = getProperties('la-nacion-ar');
    const value = properties.ttlConfig.sectionsSource.ttl;
    return value;
};

/**
 * TODO: Revisar ttl para este contentSource
 */

export default {
    resolve,
    schemaName: 'sections-schema',
    params: {
        website: 'text'
    }
};
