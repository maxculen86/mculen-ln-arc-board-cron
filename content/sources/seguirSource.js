import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';

const sourceElementes = [
    '_id',
    'subtype',
    'promo_items',
    'taxonomy.tags',
    'taxonomy.primary_section',
    'credits,headlines.basic',
    'headlines.mobile',
    'subheadlines',
    'display_date',
    'publish_date',
    'first_publish_date',
    'display_date',
    'website_url',
    'canonical_url',
    'marquesina',
    'label.recomendar.text'
];

const mustElements = key => {
    // Validacion de fecha y cualquier otro tipo de validacion
    const must = [
        {
            term: {
                type: 'story'
            }
        },
        {
            term: {
                'revision.published': true
            }
        }
    ];
    return must;
};

const shouldElements = query => {
    const elem = {
        minimum_should_match: 1,
        should: []
    };

    if (query.sections)
        elem.should.push({
            terms: {
                'taxonomy.sections._id': query.section
            }
        });

    if (query.tags)
        elem.should.push({
            terms: {
                'taxonomy.tags.slug': query.tag
            }
        });

    if (query.authors)
        elem.should.push({
            terms: {
                'credits.by._id': query.author
            }
        });

    return elem;
};

const resolveUri = query => {
    const { size, from } = query;
    const requestUri = `${CONTENT_BASE}/content/v4/search/published`;
    const uriParams = [
        `website=${query['arc-site']}`,
        `&size=${size}`,
        `&from=${from}`
    ].join('&');

    const body = {
        _source: sourceElementes,
        query: {
            bool: {
                must: mustElements,
                ...shouldElements(query)
            }
        }
    };

    const encodedBody = encodeURI(JSON.stringify(body));
    return `${requestUri}?${uriParams}&body=${encodedBody}`;
};

const getElements = async query => {
    if (!ARC_ACCESS_TOKEN) throw new Error();

    const { url = '' } = query;
    const arcSite = query['arc-site'];

    const opt = {
        auth: {
            bearer: ARC_ACCESS_TOKEN
        },
        uri: resolveUri(query),
        json: true
    };

    return request(opt)
        .then(response => {
            return response;
        })
        .catch(err => {
            logger.push(err, { source: 'content/source', url }, arcSite);
        });
};

const getUserFollowedItems = userToken => {
    if (userToken) console.log('ola');

    const resp = {
        section: [],
        author: ['carlos-pagni-8'],
        tags: []
    };

    return resp;
};

const fetch = async (query, { cachedCall }) => {
    const { userToken = '' } = query;
    let { tag = '', section = '', author = '' } = query;

    if (!userToken) {
        const elem = getUserFollowedItems(userToken);
        tag = elem.tags;
        section = elem.section;
        author = elem.author;
    }

    const resp = cachedCall(`elementSeguir`, getElements, {
        query: {
            ...query,
            tag,
            section,
            author
        },
        ttl: 120
    });

    return Promise.all(resp);
};

export default {
    fetch,
    ttl: 300,
    params: {
        userToken: 'text',
        tag: 'text',
        section: 'text',
        author: 'text',
        days: 'number',
        page: 'number',
        size: 'number'
    }
};
