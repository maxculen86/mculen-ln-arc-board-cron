import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import filter from '../filters/foodit/fooditHasVideoSource';

const fetch = query => {
    const { idArticle = '' } = query;
    const filters = '&included_fields=content_elements';
    const url = `${CONTENT_BASE}/content/v4/stories/?website=foodit&_id=${idArticle}&published=true&${filters}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (ARC_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    const resolveData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await global.fetch(url, {
                method: 'GET',
                headers,
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                logger.push('Request timed out', {
                    source: 'content/sources/fooditHasVideoSource',
                    url
                });
            } else {
                logger.push(error.message, {
                    source: 'content/sources/fooditHasVideoSource',
                    url
                });
            }
            return {};
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return Promise.resolve(resolveData());
};

export default {
    fetch,
    params: {
        idArticle: 'text'
    },
    filter,
    ttl: 120
};
