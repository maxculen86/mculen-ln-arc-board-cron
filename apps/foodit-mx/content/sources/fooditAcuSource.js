import acuArticlesSourceV2 from './acuArticlesSourceV2';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import { transformFooditAcu } from './utils/fooditSources/acuArticleSourceV2/helper';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    const resolveData = async () => {
        try {
            const response = await cachedCall(
                'acuArticleSourceV2',
                acuArticlesSourceV2.fetch,
                {
                    query,
                    independent: true
                }
            );
            return transformFooditAcu(response, query, cachedCall);
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/source/fooditAcuSource',
                    url: get(query, 'url', '')
                },
                arcSite
            );
            throw error;
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        sectionId: 'text',
        authorId: 'text',
        size: 'text',
        page: 'text',
        website: 'text',
        imageConfig: 'text',
        collectionId: 'text'
    },
    ttl: 120
};
