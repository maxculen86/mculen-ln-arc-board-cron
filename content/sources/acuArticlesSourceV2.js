import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getQueryParams from './utils/acuArticleSourceV2/getQueryParams';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const fetch = async query => {
    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `${CONTENT_BASE}${getQueryParams(query)}`,
                opt
            );
            handleHttpError(response);
            return await response.json();
        } catch (error) {
            console.warn(
                `content/acuArticlesSourceV2 Error: ${JSON.stringify(
                    query
                )} - errorMsj:${error.message}`
            );
            logger.push(error, {
                source: 'content/sources/acuArticlesSourceV2',
                query
            });

            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        sectionId: 'text',
        authorId: 'text',
        tagId: 'text',
        subtype: 'text',
        size: 'text',
        page: 'text',
        website: 'text',
        imageConfig: 'text',
        sectionsIds: 'text',
        sourceOrigin: 'text',
        excludeSourceOrigin: 'text',
        excludeSectionId: 'text',
        api: 'bool',
        promoItemsOnly: 'text',
        distributorId: 'text',
        type: 'text',
        shouldNotFilter: 'text',
        excludePreload: 'bool',
        hasCollectionApertura: 'bool',
        collectionId: 'text'
    },
    ttl: 120
};
