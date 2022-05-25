import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

let auth;
if (ARC_ACCESS_TOKEN) {
    auth = {
        bearer: ARC_ACCESS_TOKEN
    };
}

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

    if (query.section)
        elem.should.push({
            terms: {
                'taxonomy.sections._id': query.section
            }
        });

    if (query.tag)
        elem.should.push({
            terms: {
                'taxonomy.tags.slug': query.tag
            }
        });

    if (query.author)
        elem.should.push({
            terms: {
                'credits.by._id': query.author
            }
        });
    return elem;
};

const resolveUri = query => {
    const { size, page } = query;
    const requestUri = `${CONTENT_BASE}/content/v4/search/published`;

    const uriParams = [
        `website=${query['arc-site']}`,
        `size=${size}`,
        `from=${page}`
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
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const opt = {
        auth,
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
    // if (userToken) console.log('ola');

    const resp = {
        section: [],
        author: ['joaquin-morales-sola-51', 'carlos-pagni-81'],
        tag: []
    };
    return resp;
};

const fetch = async (query, { cachedCall }) => {
    const { userToken = '' } = query;
    let { tag = '', section = '', author = '' } = query;

    if (userToken) {
        const elem = getUserFollowedItems(userToken);
        tag = elem.tag;
        section = elem.section;
        author = elem.author;
    }

    const resp = await cachedCall(`elementSeguir`, getElements, {
        query: {
            ...query,
            tag,
            section,
            author
        },
        ttl: 120
    });

    return resp;
};

export default {
    fetch,
    ttl: 300,
    params: {
        userToken: 'text',
        page: 'text',
        size: 'text'
    }
};
