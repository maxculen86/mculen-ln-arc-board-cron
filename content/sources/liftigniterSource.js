import request from 'request-promise-native';
import {
    RESIZER_KEY,
    RESIZER_URL,
    WIDGETS,
    LIFTIGNITER_X_API_KEY,
    JSK_ID,
    SITE_LANACION
} from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import isvalidUrl from '../../components/private/common/utils/isvalidUrl';
import logger from '../../components/private/common/utils/logger';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import getPresets from './utils/presets';
import ArticleSourceNotas from './acuArticlesSourcebyIds';

const transformArticles = (liftigniterArticles = [], cantidadNotas) =>
    liftigniterArticles &&
    liftigniterArticles
        .filter(
            e =>
                e.image &&
                !(e.image && e.image.includes('/images/placeholderLN.jpg'))
        )
        .slice(0, cantidadNotas)
        .map(elem => {
            const {
                url,
                id,
                title,
                titleShort = '',
                leadText = '',
                image
            } = elem;
            return {
                subtype: 1,
                by: {},
                website_url: url,
                _id: id,
                headlines: {
                    basic: title,
                    mobile: titleShort
                },
                label: {
                    volanta: {
                        text: leadText
                    }
                },
                promo_items: {
                    basic: {
                        type: 'image',
                        url: image
                    }
                }
            };
        });

/**
 * TODO: Por completar de tarea
 * 1. Mejorar armado de uri, version, endpoint y body como parametro de liftigniter
 * 2. Mejora de registro de click, enviar listado de items
 */

const fetch = query => {
    const {
        referrer = SITE_LANACION,
        idArticle,
        excludeItems = [],
        excludeNotas,
        action,
        nextUrl,
        articles = [],
        uri,
        nextIdArticle,
        listArticles,
        sizeMax = 20
    } = query;

    let allArticles = action === 'activity' ? listArticles : excludeNotas;
    allArticles = allArticles?.replace('/', '') || '';
    allArticles = allArticles?.replace('[', '') || '';
    allArticles = allArticles?.replace(']', '') || '';

    const nextIdArticleClean = nextIdArticle?.match(/([A-Z0-9]+)/)?.[1];
    if (nextIdArticleClean && !!nextIdArticleClean) {
        allArticles = nextIdArticleClean.concat(',', allArticles);
    }
    const idArticleClean = idArticle?.replace('/', '');
    if (idArticle && !!idArticle) {
        allArticles = idArticleClean.concat(',', allArticles);
    }

    if (allArticles && !!allArticles) {
        const arcSiteStorys = get(query, 'arc-site', null);
        const queryArticles = {
            Ids: allArticles,
            sizeMax,
            uri,
            'arc-site': arcSiteStorys
        };
        return ArticleSourceNotas.fetch(queryArticles)
            .then(resp => {
                const queryAdapted = { ...query };
                let urlReferer = null;
                let nextUrlReferer = nextUrl;

                resp.content_elements.map((item, i) => {
                    let itemUrl = get(item, 'canonical_url', null);

                    if (itemUrl && !itemUrl.includes('http')) {
                        itemUrl = referrer.concat(itemUrl);
                    }
                    if (itemUrl && isvalidUrl(itemUrl)) {
                        if (
                            idArticle &&
                            !!idArticle &&
                            idArticle?.includes(item?._id)
                        ) {
                            urlReferer = itemUrl;
                        }

                        if (
                            nextIdArticle &&
                            !!nextIdArticle &&
                            nextIdArticle?.includes(item?._id)
                        ) {
                            nextUrlReferer = itemUrl;
                        }

                        if (
                            excludeNotas &&
                            !!excludeNotas &&
                            excludeNotas?.includes(item?._id)
                        ) {
                            excludeItems.push(itemUrl);
                        }

                        if (
                            listArticles &&
                            !!listArticles &&
                            listArticles?.includes(item?._id)
                        ) {
                            articles.push(itemUrl);
                        }
                    }
                });

                queryAdapted.excludeItems = excludeItems;
                queryAdapted.urlReferer = urlReferer;
                queryAdapted.idArticle = idArticleClean;
                queryAdapted.nextUrl = nextUrlReferer;
                queryAdapted.articles = articles;

                return resolveData(queryAdapted);
            })
            .catch(error => {
                logger.push(
                    error,
                    {
                        source: 'content/sources/articleSourcebyIds',
                        url: `${uri}`
                    },
                    arcSiteStorys
                );
            });
    }

    return resolveData(query);
};

const duplicateMaxCount = cantidadNotas => cantidadNotas * 2;

const resolveData = query => {
    const {
        cantidadNotas = 9,
        referrer = SITE_LANACION,
        imageConfig = 'm',
        idArticle,
        userId = '',
        sessionId,
        excludeItems = [],
        arcSite,
        action,
        nextUrl,
        widgetType,
        articles = [],
        urlReferer = null,
        maxAgeInSeconds
    } = query;

    const userIdParam = userId && !userId.includes('/') ? `/${userId}` : '';
    const baseUrl = `https://query.petametrics.com/v3/${JSK_ID}${userIdParam}`;
    const headers = {
        'Accept-Encoding': '*,q=0.8',
        'Content-Type': 'application/json',
        'x-api-key': LIFTIGNITER_X_API_KEY
    };
    const body = {
        url: urlReferer === null ? referrer : urlReferer,
        referrer,
        sessionId,
        pageviewId: idArticle
    };

    const timestamp = Date.now();

    const WIDGET_BODY = {
        widget_click: {
            ...body,
            type: 'widget_click',
            widgetName: WIDGETS,
            clickUrl: nextUrl,
            source: 'LI',
            timestamp,
            visibleItems: articles
        },
        widget_shown: {
            ...body,
            type: 'widget_shown',
            widgetName: WIDGETS,
            source: 'LI',
            timestamp,
            visibleItems: articles
        },
        widget_visible: {
            ...body,
            type: 'widget_visible',
            widgetName: WIDGETS,
            source: 'LI',
            timestamp,
            visibleItems: articles // preguntar
        }
    };

    const REQUESTS = {
        activity: {
            uri: `${baseUrl}/activity`,
            method: 'POST',
            headers,
            body: JSON.stringify({
                activities: [
                    {
                        ...WIDGET_BODY[widgetType]
                    }
                ]
            }),
            resolve: response => {
                return (response && JSON.parse(response)) || {};
            },
            reject: error => {
                logger.push(
                    error,
                    {
                        source: 'content/sources/liftigniterSource',
                        url: `${baseUrl}/activity`
                    },
                    arcSite
                );
            }
        },
        model: {
            uri: `${baseUrl}/model`,
            method: 'POST',
            headers,
            body: JSON.stringify({
                widgetName: WIDGETS,
                maxCount: duplicateMaxCount(cantidadNotas),
                requestFields: [
                    'url',
                    'title',
                    'titleShort',
                    'leadText',
                    'image',
                    'id',
                    'published_time'
                ],
                referrer,
                pageviewId: idArticle,
                url: urlReferer === null ? referrer : urlReferer,
                sessionId,
                excludeItems,
                maxAgeInSeconds
            }),
            resolve: response => {
                const { items } = JSON.parse(response);
                return transform(
                    transformArticles(items, cantidadNotas),
                    query
                );
            },
            reject: error => {
                logger.push(
                    error,
                    {
                        source: 'content/sources/liftigniterSource',
                        url: `${baseUrl}/model`
                    },
                    arcSite
                );
            }
        }
    };
    const queryRequest = {
        uri: REQUESTS[action].uri,
        method: REQUESTS[action].method,
        headers: REQUESTS[action].headers,
        body: REQUESTS[action].body
    };
    return request(queryRequest)
        .then(response => REQUESTS[action].resolve(response))
        .catch(error => REQUESTS[action].reject(error));
};

const transform = (data, siteProps) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    return data.map(elem => {
        const promoItems = get(elem, `promo_items`, null);
        const subtype = get(elem, `subtype`, null);
        const isFotoAl100orStorytelling =
            subtype === FOTOAL100 || subtype === STORYTELLING;
        return {
            ...elem,
            ...addResizedUrls(
                {
                    ...(promoItems && {
                        promo_items: promoItems
                    })
                },
                {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems,
                        presetsDefault
                    },
                    // Se pasa el subtype para que las notas de foto al 100
                    // y storytelling no sean excluidas de las validaciones del resizer
                    // y pueda aplicarse 3:2, focal point o smartcrop
                    subtype: isFotoAl100orStorytelling ? '-1' : subtype
                }
            )
        };
    });
};

/**
 * TODO: Por completar de tarea
 * 3. Confirmar el ttl
 */

export default {
    fetch,
    params: {
        cantidadNotas: 'text',
        referrer: 'text',
        imageConfig: 'text',
        action: 'text',
        sessionId: 'text',
        idArticle: 'text',
        userId: 'text',
        maxAgeInSeconds: 'text',
        excludeNotas: 'text',
        widgetType: 'text',
        nextIdArticle: 'text',
        listArticles: 'text',
        sizeMax: 'text'
    },
    ttl: 120
};
