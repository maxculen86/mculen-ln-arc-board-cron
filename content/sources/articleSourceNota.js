import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import { resizerSecret, resizerUrl } from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import filter from '../filters/LN/nota/article';

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

    let presets = get(
        properties,
        `imageConfig.resize.nota.bySubtype[${data.subtype}]`,
        null
    );

    if (!presets) {
        presets = get(
            properties,
            'imageConfig.resize.nota.bySubtype[default]',
            null
        );
    }

    let resp = data;
    if (presets) {
        resp = addResizedUrls(data, {
            resizerSecret,
            resizerUrl,
            presets
        });
    }

    resp.imageResizePresets = presets;

    return resp;
};

export default {
    resolve,
    params: {
        url: 'text',
        id: 'text',
        website: 'text'
    },
    filter,
    transform
};
