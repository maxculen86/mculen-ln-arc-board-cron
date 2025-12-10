import { API_QUERYLY, API_KEY_QUERYLY } from 'fusion:environment';

import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

export const resolve = key => {
    const { query, groups = '', itemGroups = '', skipArticles = 0 } = key;
    if (!query)
        throw new Error(
            'Debe definir un query (termino de busqueda) para realizar la consulta - Queryly Source Foodit'
        );

    const basePath = `${API_QUERYLY}/json.aspx?queryly_key=${API_KEY_QUERYLY}&sort=date&query=${query} `;

    const queryParams = [];

    if (groups.trim()) {
        queryParams.push(`facetedkey=${encodeURIComponent(groups)}`);
    }
    if (itemGroups.trim()) {
        queryParams.push(`facetedvalue=${encodeURIComponent(itemGroups)}`);
    }

    const dataFields = [
        'category',
        'creator',
        'subtype',
        'counter_time',
        'guid',
        'creator',
        'imageresizer',
        'promo_image',
        'counter_time',
        'section',
        'subtype',
        'content_code',
        'video_jw'
    ];
    const maxArticles = 24;
    const endIndex = `endindex=${skipArticles}`;
    const batchSize = `batchsize=${maxArticles}`;
    const extendedDataFields = `extendeddatafields=${dataFields.join(',')}`;
    return `${basePath}&${extendedDataFields}&${endIndex}&${batchSize}&${queryParams.join('&')}`;
};

const fetch = async (query = {}) => {
    const arcSite = query['arc-site'];
    const { title = '', _id = '' } = query;
    const url = `${resolve(query)}`;

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);

    const opt = {
        method: 'GET',
        signal: abortController.signal
    };

    try {
        const resp = await global.fetch(url, opt);

        handleHttpError(resp);

        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}, URL: ${url}`);
        }

        const { items = [], metadata: { total, endindex } = {} } =
            await resp.json();

        return {
            articles: items,
            total,
            endindex,
            _id,
            title,
            query,
            name: title
        };
    } catch (err) {
        if (err.name === 'AbortError') {
            logger.push(
                'Request timed out',
                {
                    source: 'content/sources/fooditQuerylySource',
                    url
                },
                arcSite
            );
        } else {
            logger.push(
                err,
                {
                    source: 'content/sources/fooditQuerylySource'
                },
                arcSite
            );
        }
        return {};
    } finally {
        clearTimeout(timeoutId);
    }
};

export default {
    fetch,
    params: {
        _id: 'text',
        query: 'text',
        website: 'text',
        outputType: 'text',
        groups: 'text',
        itemGroups: 'text',
        title: 'text',
        skipArticles: 'text'
    },
    ttl: 360
};
