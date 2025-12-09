import logger from '../../components/private/common/utils/logger';
import {
    getMediaJwData,
    transformResultWithResizer
} from './utils/videoFichaJwSource/_helper';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

// ESTE SOURCE SE UTILIZA TANTO PARA OTT COMO PARA EL VIDEO EXPANDIDO DEL CARROUSEL
const transform = (data, url) => getMediaJwData(data, url);

const fetch = async (query, { cachedCall } = {}) => {
    const { uri, url, 'arc-site': arcSite } = query;

    const regex = /jwid(\w{8})/;
    const { 1: videoId } = uri.match(regex) || {};

    if (!videoId) {
        throw new Error('Invalid video ID');
    }

    const mediaUrl = `https://cdn.jwplayer.com/v2/media/${videoId}`;

    try {
        const response = await global.fetch(mediaUrl);
        handleHttpError(response);
        const mediaString = await response.text();

        const result = transform(mediaString, url);

        return await transformResultWithResizer({
            result,
            arcSite,
            query,
            cachedCall
        });
    } catch (error) {
        const errorDetails = {
            source: 'content/source/videoFichaJwSource',
            url
        };
        logger.push(error, errorDetails, arcSite, true);
        throw error;
    }
};

export default {
    fetch,
    params: {
        url: 'text',
        uri: 'text',
        website: 'text'
    },
    ttl: 900
};
