import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { transformPodcastData } from './utils/podcast/_helper';

const baseFeedUrl = 'https://anchor.fm/s/';
const endFeedUrl = '/podcast/rss';

const fetch = query => {
    const resolveData = async () => {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 10000);
        try {
            if (!query.podcastId) {
                throw new Error('podcastId is required');
            }
            const response = await global.fetch(
                `${baseFeedUrl}${query.podcastId}${endFeedUrl}`,
                { signal: abortController.signal }
            );
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
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        podcastId: 'text'
    },
    ttl: 900
};
