import getProperties from 'fusion:properties';
import request from 'request-promise-native';
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

    const resolveData = async () => {
        try {
            const data = await request(
                `https://cdn.jwplayer.com/v2/media/${id}`
            );
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

            const { sources, poster } = getVideoJwDataHome(JSON.parse(data));
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
            return null;
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
