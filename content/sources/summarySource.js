import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';
import getTextOfContent from './utils/summarySource/getTextOfContent';

const fetch = async query => {
    const { idArticle = '' } = query;
    const arcSite = 'la-nacion-ar';
    const filters = '&included_fields=content_elements,subtype';
    const url = `${CONTENT_BASE}/content/v4/stories/?website=${arcSite}&_id=${idArticle}&published=false${filters}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (ARC_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    try {
        const response = await global.fetch(url, {
            method: 'GET',
            headers
        });

        handleHttpError(response);

        const data = await response.json();

        return {
            data: getTextOfContent(data.content_elements) || '',
            subtype: data.subtype || ''
        };
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/summarySource',
                query,
                url,
                idArticle
            },
            arcSite
        );
        return {};
    }
};

export default {
    fetch,
    params: {
        idArticle: 'text'
    },
    ttl: 120
};
