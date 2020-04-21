import getProperties from 'fusion:properties';

const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener el video');
};

const ttlValue = () => {
    const properties = getProperties('la-nacion-ar');
    const value = properties.ttlConfig.videoSource.ttl;
    return value;
};

/**
 * TODO: Revisar ttl para este contentSource
 */

export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    }
};
