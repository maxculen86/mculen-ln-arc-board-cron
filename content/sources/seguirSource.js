import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';

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

const shouldElements = key => {
    const elem = {
        minimum_should_match: 1,
        should: []
    };

    if (key.sections)
        elem.should.push({
            terms: {
                'taxonomy.sections._id': key.sections
            }
        });

    if (key.tags)
        elem.should.push({
            terms: {
                'taxonomy.tags.slug': key.tags
            }
        });

    if (key.authors)
        elem.should.push({
            terms: {
                'credits.by._id': key.tags
            }
        });

    return elem;
};

const resolveUri = key => {
    const requestUri = `${CONTENT_BASE}/content/v4/search/published`;
    const uriParams = [`website=${key['arc-site']}`, `&size=10`].join('&');

    const body = {
        _source: sourceElementes,
        query: {
            bool: {
                must: mustElements,
                ...shouldElements(key)
            }
        }
    };

    const encodedBody = encodeURI(JSON.stringify(body));
    return `${requestUri}?${uriParams}&body=${encodedBody}`;
};

const fetch = (query, { cachedCall }) => {
    //Obtener datos de lo que el usuario sigue
    //Llamada a ARC
    //Return InfoArc
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
        page: 'number'
    }
};
