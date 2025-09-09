import acuArticlesSourceV2 from './acuArticlesSourceV2';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import transformLnAcu from './utils/lnAcuSources/helper';
import transformLnAcuApi from './utils/lnAcuSources/api/helper';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];
    const apiTransform = {
        transformLnAcuApi
    };

    const resolveData = async () => {
        try {
            const response = await cachedCall(
                'acuArticlesSourceV2',
                acuArticlesSourceV2.fetch,
                { query, independent: true }
            );
            if (query && query.apiTransform) {
                return apiTransform[query.apiTransform](
                    response,
                    query,
                    cachedCall
                );
            }
            return transformLnAcu(cachedCall, response, query);
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/source/apiLnAcuSource',
                    url: get(query, 'website', '')
                },
                arcSite
            );

            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        sectionId: 'text',
        tagId: 'text',
        subtype: 'text',
        excludeSectionId: 'text',
        shouldNotFilter: 'text',
        website: 'text',
        size: 'text',
        imageConfig: 'text',
        sourceOrigin: 'text',
        type: 'text',
        promoItemsOnly: 'text',
        excludePreload: 'bool',
        apiTransform: 'text',
        page: 'text',
        distributorId: 'text'
    },
    ttl: 120
};
