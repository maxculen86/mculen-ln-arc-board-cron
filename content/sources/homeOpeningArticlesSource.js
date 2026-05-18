import { extractAperturaHomeArticles } from './utils/homeOpeningArticles/transform';
import logger from '../../components/private/common/utils/logger';

const ENDPOINT_URL =
    'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=jsonv2';
const TTL = 120;

const fetchHomePage = async () => {
    const response = await global.fetch(ENDPOINT_URL);
    if (!response || !response.ok) {
        throw new Error(
            `homeOpeningArticlesSource: HTTP ${response?.status || 'no-response'} fetching ${ENDPOINT_URL}`
        );
    }
    return response.json();
};

const fetch = async (_query, { cachedCall }) => {
    try {
        const homePage = await cachedCall(
            'homeOpeningArticlesSource',
            fetchHomePage,
            { ttl: TTL, independent: true }
        );

        if (!homePage) return { content_elements: [] };

        return { content_elements: extractAperturaHomeArticles(homePage) };
    } catch (error) {
        logger.push(error, {
            source: 'content/source/homeOpeningArticlesSource'
        });
        return { content_elements: [] };
    }
};

export default {
    fetch,
    ttl: TTL
};
