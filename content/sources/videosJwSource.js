import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import { getVideoJwDataHome } from './utils/getVideoJwDataHome';

const fetch = query => {
    const { id = '' } = query;

    return request(`https://cdn.jwplayer.com/v2/media/${id}`)
        .then(resp => transform(resp))
        .catch(err => {
            logger.push(
                err,
                {
                    source: 'content/sources/videosJwSource',
                    id
                },
                query['arc-site']
            );
        });
};

const transform = data => {
    return {
        ...getVideoJwDataHome(JSON.parse(data)),
        type: 'video'
    };
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
