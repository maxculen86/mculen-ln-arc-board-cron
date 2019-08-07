import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import getProperties from 'fusion:properties';
import filter from '../filters/LN/nota/articleAcu';

const resolve = (key, a) => {
    const { url, id, website } = key;
    const arcSite = key['arc-site'];
    const basePath = `/content/v4/stories/?website=${website || arcSite}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener la nota');
};

const transform = (data, siteProps) => {
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);
    const presets = properties.imageConfig.resize.nota.bySubtype[data.subtype];
    const resp = addResizedUrls(data, {
        resizerSecret,
        resizerUrl,
        presets
    });

    resp.imageResizePresets = presets;

    return resp;
};

export default {
    resolve,
    // schemaName: source.schemaName,
    params: {
        url: 'text',
        id: 'text',
        website: 'text'
    },
    filter,
    transform
};
