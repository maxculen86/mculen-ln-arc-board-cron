import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import request from 'request-promise-native';
import personalization from './utils/servicesSource/personalization';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';
import OrderElements from './utils/orderElements';
import transform from './utils/acuArticlesSource/transform';
import get from '../../components/private/common/utils/get';

let auth;
if (ARC_ACCESS_TOKEN) {
    auth = {
        bearer: ARC_ACCESS_TOKEN
    };
}

const sourceExclude = ['geo', 'related_content', 'content_elements'];

// Validación para que predomine el sourceExclude sobre el sourceInclude en caso de no ser vacio.
let sourceInclude = [
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
sourceInclude = !sourceExclude.length ? sourceInclude : [];
const mustElements = days => {
    const must = [
        {
            range: {
                first_publish_date: {
                    gte: `now-${(parseInt(days, 0) + 1).toString() || '5'}d`,
                    lte: 'now'
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
    const from = ((page || 1) - 1) * size;

    const requestUri = `${CONTENT_BASE}/content/v4/search/published`;
    const uriParams = [
        `website=${query['arc-site']}`,
        `size=${size}`,
        `from=${from}`,
        `${
            !sourceInclude.length
                ? ''
                : `_sourceInclude=${sourceInclude.join(',')}`
        }`,
        `${
            !sourceExclude.length
                ? ''
                : `_sourceExclude=${sourceExclude.join(',')}`
        }`,
        `sort=display_date:desc`
    ]
        .join('&')
        .replace(/&&/, '&');

    const body = {
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
    const { url = '', followedItems } = query;
    const arcSite = query['arc-site'];

    const queryTransform = {
        sectionId: get(
            followedItems.find(x => x.type === 'seccion'),
            'slug',
            null
        ),
        authorId: get(
            followedItems.find(x => x.type === 'autor'),
            'slug',
            null
        ),
        tagId: get(
            followedItems.find(x => x.type === 'tags'),
            'slug',
            null
        ),
        imageConfig: 'm',
        size: get(query, 'size', null),
        page: get(query, 'page', null),
        api: Boolean(get(query, 'api', false)),
        'arc-site': get(query, 'arc-site', null)
    };

    const opt = {
        auth,
        uri: resolveUri(query),
        json: true
    };
    return request(opt)
        .then(response => {
            return transform(response, queryTransform);
        })
        .catch(err => {
            logger.push(err, { source: 'content/source', url }, arcSite);
        });
};

// TODO: Validar con producto el default de dias, tamano (Puede que quieran una variable de configuracion global en caso de venir en null de front)
const fetch = async (query, { cachedCall }) => {
    const {
        token,
        size = 10,
        days = 10,
        page = 1,
        autor,
        seccion,
        tags,
        api = false,
        uri,
        sizeFollow = 50,
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    let seccionField = seccion;
    if (seccionField && seccionField !== '/') {
        seccionField = seccionField.replace(/\/$/, '');
        if (!seccionField.startsWith('/')) {
            seccionField = `/${seccionField}`;
        }
    }

    const keyParams = [
        { type: 'token', slug: `${token || ''}`, id: 0 },
        { type: 'autor', slug: `${autor || ''}`, id: 0 },
        { type: 'seccion', slug: `${seccionField || ''}`, id: 0 },
        { type: 'tags', slug: `${tags || ''}`, id: 0 }
    ];

    const keyQuery = keyParams.filter(x => x.slug !== '');

    if (keyQuery.length !== 1) {
        throw new NotFoundError('Cantidad de parámetros inválidos');
    }

    // TODO: validar que el user token sea distinto de null.
    let followedItems = [];
    if (token) {
        const optRequest = {
            token,
            uri,
            sizeFollow
        };

        followedItems = await personalization.request(optRequest);
    } else {
        followedItems = keyQuery;
    }

    followedItems = followedItems.sort(function orderFollow(a, b) {
        const elemA = a.type.concat(a.slug);
        const elemB = b.type.concat(b.slug);
        return OrderElements(elemA, elemB);
    });
    const keyCacheSeguir = followedItems
        .map(elem => {
            return elem.slug;
        })
        .join('_')
        .replace(/__/, '_')
        .concat('_', page);

    // TODO: Colocar como clave de cache el string union de los tres elementos mas la pagina (Organizados por orden alfabetico).
    const stories = await cachedCall(keyCacheSeguir, getElements, {
        query: {
            followedItems,
            size,
            days,
            page,
            api,
            arcSite
        },
        ttl: 120
    });

    return { ...stories, followedItems };
};

export default {
    fetch,
    ttl: 120,
    params: {
        page: 'text',
        size: 'text',
        days: 'text',
        token: 'text',
        autor: 'text',
        seccion: 'text',
        tags: 'text',
        api: 'bool',
        sizeFollow: 'text'
    }
};
