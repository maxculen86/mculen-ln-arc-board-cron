import getTTLValue from './utils/sourceSetting';

const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener el video');
};

export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    },
    ttl: getTTLValue('videoSource')
};
