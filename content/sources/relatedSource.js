import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

const resolve = key => {
    const { includedFields, id, notPublished = true } = key;
    const arcSite = key['arc-site'];
    const iFields = includedFields ? `&included_fields=${includedFields}` : '';

    const basePath = `/content/v4/stories/?website=${arcSite}${
        notPublished ? '&published=false' : ''
    }`;

    return `${basePath}&_id=${id}${iFields}`;
};

const fetch = async query => {
    const arcSite = query['arc-site'];
    const url = `${CONTENT_BASE}${resolve(query)}`;

    const options = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        options.headers = {
            Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
        };
    }

    try {
        const response = await global.fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/relatedSource',
                query,
                url
            },
            arcSite
        );

        return {};
    }
};

export default {
    fetch,
    params: {
        id: 'text',
        includeFields: 'text'
    },
    ttl: 600
};
