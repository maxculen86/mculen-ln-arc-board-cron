import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { transformPodcastData } from './utils/podcast/_helper';

const feedUrl = 'https://anchor.fm/s/107a7f21c/podcast/rss';

const fetch = query => {
    const resolveData = async () => {
        try {
            const response = await global.fetch(query.feedUrl || feedUrl);
            handleHttpError(response);
            const data = await response.text();
            return transformPodcastData(data);
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/podcastSource'
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
        feedUrl: 'text'
    },
    ttl: 900
};
