const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;

    if (id) return `${basePath}&_id=${id}`;
    else if (url) return `${basePath}&website_url=${url}`;
    else throw new Error('Debe definir url o id para obtener el video');
};
export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    }
};
