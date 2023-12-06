import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import { getMediaJwData } from './utils/videoFichaJwSource/_helper';

const fetch = async query => {
    const { uri, url, 'arc-site': arcSite } = query;

    const regex = /jwid(\w{8})/;
    const { 1: videoId } = uri.match(regex) || {};

    if (!videoId) {
        throw new Error('Invalid video ID');
    }

    const mediaUrl = `https://cdn.jwplayer.com/v2/media/${videoId}`;

    try {
        const mediaResponse = await request(mediaUrl);
        return transform(mediaResponse, url);
    } catch (error) {
        const errorDetails = {
            source: 'content/source/videoFichaJwSource',
            url
        };
        logger.push(error, errorDetails, arcSite, true);
        throw error;
    }
};

const transform = (data, url) => getMediaJwData(data, url);

export default {
    fetch,
    params: {
        url: 'text',
        website: 'text'
    },
    ttl: 900
};
