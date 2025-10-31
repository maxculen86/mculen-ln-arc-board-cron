import logger from '../../components/private/common/utils/logger';
import { getVideoJwDataHome } from './utils/getVideoJwDataHome';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import { signingServiceCachedCall } from './utils/signingServiceSource/getImagesAuth';

export const transform = async ({ data = {}, query = {}, cachedCall }) => {
    const videoData = getVideoJwDataHome(data);
    const imageJW = get(videoData, 'image', '');
    const { presets = {}, presetsDefault } = getPresets(query) || {};
    const { hash: videoJwHash = '' } = await signingServiceCachedCall(
        imageJW,
        cachedCall
    );
    const presetsPromoItems = get(presets, 'promo_items', null);

    const promoItems = {
        basic: {
            embed: { config: { videoJw: { playlist: [videoData] } } },
            url: imageJW,
            type: 'image',
            auth: { 1: videoJwHash }
        },
        subtype: 'video_jw'
    };

    return {
        ...videoData,
        type: 'video',
        resizedImages: addResizedUrls(
            {
                ...(promoItems && { promo_items: promoItems })
            },
            {
                presets: {
                    promoItems: presetsPromoItems,
                    presetsDefault
                },
                isAdmin: get(query, 'isAdmin', false),
                arcSite: query['arc-site'] || 'la-nacion-ar'
            }
        )
    };
};

const fetch = (query, { cachedCall } = {}) => {
    const { id } = query || {};

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `https://cdn.jwplayer.com/v2/media/${id}`
            );
            const data = await response.json();
            return transform({ data, query, cachedCall });
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/videosJwSource',
                    id
                },
                query['arc-site']
            );
            return {};
        }
    };
    return resolveData();
};

export default {
    fetch,
    params: {
        id: 'text',
        url: 'text',
        website: 'text',
        imageConfig: 'text',
        isInApertura: 'bool'
    },
    ttl: 900
};
