import getProperties from 'fusion:properties';
import logger from '../../components/private/common/utils/logger';
import { getVideoJwDataHome } from './utils/getVideoJwDataHome';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';
import { resizeImgUrl } from '../../components/private/common/utils/image/resizer/v2/resizerHelper';
import get from '../../components/private/common/utils/get';

const fetch = (query, { cachedCall } = {}) => {
    const {
        id = '',
        imageConfig = 'grid2notes',
        isInApertura = false
    } = query || {};

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const resolveData = async () => {
        try {
            const res = await global.fetch(
                `https://cdn.jwplayer.com/v2/media/${id}`,
                { signal: controller.signal }
            );

            if (!res.ok) {
                throw new Error(
                    `JWPlayer fetch failed: ${res.status} ${res.statusText}`
                );
            }

            const jsonData = await res.json();
            const properties = getProperties('foodit');

            const imagePreset = get(
                properties,
                `imageConfig.resize.${imageConfig}.poster.sizes`,
                {
                    width: 280,
                    height: 280,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            );

            const { sources, poster } = getVideoJwDataHome(jsonData);
            const signingResponse = await signingServiceCachedCall(
                poster,
                cachedCall
            );

            const resizedPoster = resizeImgUrl({
                arcImage: {
                    url: poster,
                    auth: { 1: get(signingResponse, 'hash') },
                    type: 'image'
                },
                defaultResizeWithSmart: imagePreset,
                isInApertura,
                arcSite: 'foodit'
            });

            return {
                sources,
                poster: resizedPoster,
                type: 'video'
            };
        } catch (err) {
            logger.push(
                err,
                {
                    source: 'content/sources/fooditVideoSource',
                    id
                },
                query['arc-site']
            );
            throw err;
        } finally {
            clearTimeout(timeout);
        }
    };

    return Promise.resolve(resolveData());
};

export default {
    fetch,
    params: {
        id: 'text',
        website: 'text',
        imageConfig: 'text',
        isInApertura: 'bool'
    },
    ttl: 900
};
