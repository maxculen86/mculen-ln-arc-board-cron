import nodeFetch from 'node-fetch';
import { API_QUERYLY, API_KEY_QUERYLY } from 'fusion:environment';

import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

export const resolve = key => {
    const { query, groups = '', itemGroups = '', skipArticles = 0 } = key;
    if (!query)
        throw new Error(
            'Debe definir un query (termino de busqueda) para realizar la consulta - Queryly Source Foodit'
        );

    const basePath = `${API_QUERYLY}/json.aspx?queryly_key=${API_KEY_QUERYLY}&query=${query} `;

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

const fetch = (query = {}) => {
    const arcSite = query['arc-site'];
    const { title = '', _id = '' } = query;
    const url = `${resolve(query)}`;
    const opt = {
        method: 'GET',
        json: true
    };

    return nodeFetch(url, opt)
        .then(response => {
            handleHttpError(response);
            return response.json();
        })
        .then(({ items = [], metadata: { total, endindex } = {} }) => ({
            articles: items,
            total,
            endindex,
            _id,
            title,
            query,
            name: title
        }))
        .catch(err => {
            logger.push(
                err,
                {
                    source: 'content/sources/fooditQuerylySource'
                },
                arcSite
            );
        });
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
