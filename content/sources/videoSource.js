import getProperties from 'fusion:properties';
import get from '../../components/private/common/utils/get';
import getImageResized from '../../components/private/common/utils/getImageResized';

const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener el video');
};

const transform = (data, siteProps) => {
    const focalPoint = [];
    const { imageConfig, isInApertura } = siteProps;
    const { imageConfig: { resize } = {} } = getProperties(
        siteProps['arc-site']
    );
    const isAdmin = get(siteProps, `isAdmin`, false);

    const { width, height, url } = get(data, 'promo_items.basic', {});

    const configSizes = get(resize[imageConfig], 'promo_items.sizes', []);

    return {
        ...data,
        resizedUrl: getImageResized(
            url,
            height,
            width,
            configSizes,
            focalPoint,
            isInApertura,
            isAdmin
        )
    };
};

export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    },
    transform,
    ttl: 600
};
