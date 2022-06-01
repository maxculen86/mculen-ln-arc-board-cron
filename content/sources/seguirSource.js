import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import request from 'request-promise-native';
import personalization from './utils/servicesSource/personalization';
import logger from '../../components/private/common/utils/logger';
import {
    formatToISOString,
    substractDays
} from '../../components/private/common/utils/dateAndTimeUtil';

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
    'credits.by.name',
    'credits.by.slug',
    'headlines.basic',
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

const mustElements = days => {
    const endDate = formatToISOString(new Date());
    const startDate = formatToISOString(substractDays(new Date(), days));

    const must = [
        {
            range: {
                first_publish_date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        },
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

const filterByType = (items, topicType) => {
    const selectedTopic = items
        .filter(topic => topic.type === topicType)
        .map(topic => topic.slug);

    if (!selectedTopic || selectedTopic.length === 0) return null;

    const terms = {
        seccion: {
            nested: {
                path: 'taxonomy.sections',
                query: {
                    bool: {
                        must: [
                            {
                                terms: {
                                    'taxonomy.sections._id': selectedTopic
                                }
                            }
                        ]
                    }
                }
            }
        },
        tags: { terms: { 'taxonomy.tags.slug': selectedTopic } },
        autor: { terms: { 'credits.by._id': selectedTopic } }
    };

    return terms[topicType];
};

const shouldElements = query => {
    const { followedItems } = query;
    if (followedItems.length === 0)
        throw new Error('debe de tener al menos un item a seguir');

    const elem = {
        minimum_should_match: 1,
        should: []
    };
    const section = filterByType(followedItems, 'seccion');
    section && elem.should.push(section);

    const tags = filterByType(followedItems, 'tags');
    tags && elem.should.push(tags);

    const autor = filterByType(followedItems, 'autor');
    autor && elem.should.push(autor);
    return elem;
};

const resolveUri = query => {
    const { size, page, days } = query;

    const requestUri = `${CONTENT_BASE}/content/v4/search/published`;
    const uriParams = [
        `website=${query['arc-site']}`,
        `size=${size}`,
        `from=${page}`,
        `sort=display_date:des`
    ].join('&');

    const body = {
        _source: sourceElementes,
        query: {
            bool: {
                must: mustElements(days),
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

// TODO: Validar con producto el default de dias, tamano (Puede que quieran una variable de configuracion global en caso de venir en null de front)
const fetch = async (query, { cachedCall }) => {
    const {
        token = '1F8794A8-BE03-48F9-B023-74356CE9C9F5',
        size = 10,
        days = 5,
        page = 0,
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    // TODO: validar que el user token sea distinto de null.
    const followedItems = await cachedCall(
        `PersonalizationUser-${token}`,
        personalization.request,
        {
            query: {
                token: '1F8794A8-BE03-48F9-B023-74356CE9C9F5',
                size: 50
            },
            ttl: 120
        }
    );

    // TODO: Colocar como clave de cache el string union de los tres elementos mas la pagina (Organizados por orden alfabetico).
    const stories = await cachedCall(`elementSeguir`, getElements, {
        query: {
            followedItems,
            size,
            days,
            page,
            arcSite
        },
        ttl: 120
    });

    return { ...stories, followed_items: followedItems };
};

export default {
    fetch,
    ttl: 120,
    params: {
        page: 'text',
        size: 'text',
        days: 'text',
        token: 'text'
    }
};
