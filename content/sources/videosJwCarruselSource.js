import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import { getVideoJwDataCarrusel } from './utils/getVideoJwDataCarrusel';

const transform = (videoData, posterVideo) => {
    const videoJwData = getVideoJwDataCarrusel(JSON.parse(videoData));
    return {
        ...videoJwData,
        posterVideo
    };
};

const fetch = query => {
    const { id = '' } = query;
    const baseUrl = `https://cdn.jwplayer.com/v2/media/${id}`;

    return Promise.all([
        request(baseUrl),
        request({ uri: `${baseUrl}/poster.mp4`, resolveWithFullResponse: true })
    ])
        .then(([videoData, posterResponse]) => {
            const posterVideo = posterResponse?.request?.uri?.href || null;
            return transform(videoData, posterVideo);
        })
        .catch(err => {
            logger.push(err, {
                source: 'content/sources/videosJwCarruselSource',
                id,
                message: 'Failed to fetch video data'
            });
        });
};

export default {
    fetch,
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    },
    ttl: 900
};
