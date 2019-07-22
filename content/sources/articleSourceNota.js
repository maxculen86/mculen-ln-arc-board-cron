import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import filter from '../filters/LN/nota/article';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import getProperties from 'fusion:properties';

const resolve = (key, a) => {
    const { url, id, website } = key;
    const basePath = `/content/v4/stories/?website=${website}`;

    if (id) return `${basePath}&_id=${id}`;
    else if (url) return `${basePath}&website_url=${url}`;
    else throw new Error('Debe definir url o id para obtener la nota');
};

const transform = (data, siteProps) => {
    const properties = getProperties(siteProps.website);
    return addResizedUrls(data, {
        resizerSecret,
        resizerUrl,
        presets: properties.imageConfig.resize.nota.bySubtype[data.subtype]
    });
};

export default {
    resolve,
    // schemaName: source.schemaName,
    params: {
        url: 'text',
        id: 'text'
    },
    filter,
    transform
};
