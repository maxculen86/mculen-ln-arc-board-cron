import nodeFetch from 'node-fetch';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import filter from '../filters/LN/acumulado/articleAcu';
import getQueryParams from './utils/acuArticleSourceV2/getQueryParams';

const fetch = async query => {
    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await nodeFetch(
                `${CONTENT_BASE}${getQueryParams(query)}`,
                opt
            );
            const data = await response.json();
            return data;
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

    return await resolveData();
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
        page: 'text',
        excludePreload: 'bool',
        hasCollectionApertura: 'bool',
        collectionId: 'text'
    },
    filter,
    ttl: 120
};
