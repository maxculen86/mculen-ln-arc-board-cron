import get from '../../components/private/common/utils/get';
import getImageResized from '../../components/private/common/utils/getImageResized';
import getVideoImagePresets from './utils/getVideoImagePresets';

// Tener en cuenta que OTT tambien usa este source
// TODO: Unificar transform y resizer de imagenes de videos para home y nota

const resolve = key => {
    const { id, url, website } = key;
    const basePath = `/content/v4/videos?website=${website}`;
    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;
    throw new Error('Debe definir url o id para obtener el video');
};

const transform = (data, siteProps) => {
    const arcSite = get(siteProps, 'arc-site', '');
    const presets = getVideoImagePresets(data, siteProps, arcSite);
    if (presets) {
        const {
            width,
            height,
            url,
            configSizes,
            isAdmin,
            isInApertura
        } = presets;

        const resizedUrl = getImageResized({
            url,
            originalHeight: height,
            originalWidth: width,
            options: configSizes,
            focalPoint: [],
            isInApertura,
            isAdmin
        });

        if (arcSite === 'ott') {
            const promoItems = get(data, 'promo_items.basic');
            const urlImage = get(resizedUrl[0], 'resizedUrl', '');

            return {
                ...data,
                promo_items: {
                    basic: {
                        ...promoItems,
                        resized_urls: resizedUrl,
                        url: urlImage
                    }
                }
            };
        }

        return {
            ...data,
            resizedUrl
        };
    }

    return data;
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
