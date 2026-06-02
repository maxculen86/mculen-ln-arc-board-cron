import {
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
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from './utils/presets';
import ArticleSourceNotas from './acuArticlesSourcebyIds';
import parseUrl from './utils/parseUrl';
import { enumTypeError } from '../../components/private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../components/private/LN/api/common/models/backendLnError';

const transformArticles = (cantidadNotas, liftigniterArticles = []) =>
    liftigniterArticles &&
    liftigniterArticles.slice(0, cantidadNotas).map(elem => {
        const { url, id, title, titleShort = '', leadText = '', image } = elem;
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

const getUrlsbyIds = async (query, cachedCall) => {
    const {
        referrer = SITE_LANACION,
        idArticle,
        excludeItems = [],
        excludeNotas,
        nextUrl,
        articles = [],
        uri,
        nextIdArticle,
        listArticles,
        sizeMax = 20,
        allArticles,
        idArticleClean,
        keyCachedcall
    } = query;

    if (allArticles && !!allArticles) {
        const arcSiteStorys = get(query, 'arc-site', null);

        const queryArticles = {
            Ids: allArticles,
            sizeMax,
            uri,
            'arc-site': arcSiteStorys,
            sourceInclude: 'website,website_url,canonical_url'
        };

        // Para pruebas de cache cambiar keyCachedcall por new Date().getTime()

        return cachedCall(keyCachedcall, ArticleSourceNotas.fetch, {
            query: {
                ...queryArticles
            },
            ttl: 3600,
            independent: true
        })
            .then(resp => {
                const queryAdapted = { ...query };

                let urlReferer = null;
                let nextUrlReferer = nextUrl;

                if (Array.isArray(resp.content_elements)) {
                    /* eslint-disable no-underscore-dangle */
                    resp.content_elements.forEach(item => {
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
                }
                queryAdapted.excludeItems = excludeItems;
                queryAdapted.urlReferer = urlReferer;
                queryAdapted.idArticle = idArticleClean;
                queryAdapted.nextUrl = nextUrlReferer;
                queryAdapted.articles = articles;

                return queryAdapted;
            })
            .catch(error => {
                console.error(
                    new BackendLnError(
                        `ArticleSourcebyIds - msj: ${
                            error.message
                        } - Query: ${JSON.stringify(query || {})}`,
                        enumTypeError.liftigniterError
                    )
                );

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
    throw new BackendLnError(
        `ArticleSourcebyIds - Missing AllArticles - Query: ${JSON.stringify(
            query || {}
        )}`,
        enumTypeError.liftigniterError
    );
};

export const transform = (data, siteProps) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);
    const arcSite = get(siteProps, 'arc-site', 'lanacionar');

    return data.map(elem => {
        const promoItems = get(elem, `promo_items`, null);
        const basicUrl = get(promoItems, 'basic.url', '');
        const subtype = get(elem, `subtype`, null);
        const isFotoAl100orStorytelling =
            subtype === FOTOAL100 || subtype === STORYTELLING;
        const parsedId = basicUrl.match(
            /[A-Z0-9]{26}(.(jpe?g|tiff?|webp|gif|png|bmp|jfif))?/i
        );
        const imageAuth = new URL(basicUrl).searchParams.get('auth');
        const staticResourceRegex = /\/resources\/images\//;
        const isStaticResource = staticResourceRegex.test(basicUrl);

        const imageToUse = !isStaticResource
            ? addResizedUrls(
                  {
                      ...(promoItems && {
                          promo_items: {
                              ...promoItems,
                              ...{
                                  basic: {
                                      ...get(promoItems, 'basic', {}),
                                      _id: parsedId ? parsedId[0] : '',
                                      auth: {
                                          1: imageAuth
                                      }
                                  }
                              }
                          }
                      })
                  },
                  {
                      presets: {
                          promoItems: presetsPromoItems,
                          presetsDefault
                      },
                      // Se pasa el subtype para que las notas de foto al 100
                      // y storytelling no sean excluidas de las validaciones del resizer
                      // y pueda aplicarse 3:2, focal point o smartcrop
                      subtype: isFotoAl100orStorytelling ? '-1' : subtype,
                      arcSite
                  }
              )
            : { promo_items: { basic: {} } };

        return {
            ...elem,
            ...imageToUse
        };
    });
};

const resolveData = async query => {
    const {
        cantidadNotas = 9,
        referrer = SITE_LANACION,
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
        maxAgeInSeconds,
        widgetName = WIDGETS,
        api = false
    } = query;

    const userIdParam = userId && !userId.includes('/') ? `/${userId}` : '';
    const baseUrl = `https://query.petametrics.com/v3/${JSK_ID}${userIdParam}`;
    const headers = {
        'Accept-Encoding': '*,q=0.8',
        'Content-Type': 'application/json',
        'x-api-key': LIFTIGNITER_X_API_KEY
    };

    const body = {
        url: parseUrl(urlReferer === null ? referrer : urlReferer),
        referrer,
        sessionId,
        pageviewId: idArticle
    };

    const timestamp = Date.now();

    const WIDGET_BODY = {
        widget_click: {
            ...body,
            type: 'widget_click',
            widgetName,
            clickUrl: nextUrl,
            source: 'LI',
            timestamp,
            visibleItems: articles
        },
        widget_shown: {
            ...body,
            type: 'widget_shown',
            widgetName,
            source: 'LI',
            timestamp,
            visibleItems: articles
        },
        widget_visible: {
            ...body,
            type: 'widget_visible',
            widgetName,
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
            resolve: response => (response && JSON.parse(response)) || {},
            reject: error => {
                if (api) {
                    console.error(
                        new BackendLnError(
                            `Activity - msj: ${
                                error.message
                            } - Query: ${JSON.stringify(query || {})}`,
                            enumTypeError.liftigniterError
                        )
                    );
                }
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
                widgetName,
                maxCount: cantidadNotas,
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
                    transformArticles(cantidadNotas, items),
                    query
                );
            },
            reject: error => {
                if (api) {
                    console.error(
                        new BackendLnError(
                            `Model - msj: ${
                                error.message
                            } - Query: ${JSON.stringify(query || {})}`,
                            enumTypeError.liftigniterError
                        )
                    );
                    return {};
                }
                logger.push(
                    error,
                    {
                        source: 'content/sources/liftigniterSource',
                        url: `${baseUrl}/model`
                    },
                    arcSite
                );
                return {};
            }
        }
    };
    const queryRequest = {
        uri: REQUESTS[action] && REQUESTS[action].uri,
        method: REQUESTS[action] && REQUESTS[action].method,
        headers: REQUESTS[action] && REQUESTS[action].headers,
        body: REQUESTS[action] && REQUESTS[action].body
    };

    try {
        const response = await global.fetch(queryRequest.uri, {
            method: queryRequest.method,
            headers: queryRequest.headers,
            body: queryRequest.body
        });

        const data = await response.text();

        return REQUESTS[action].resolve(data);
    } catch (error) {
        return REQUESTS[action].reject(error) || {};
    }
};

const fetch = (query, { cachedCall } = {}) => {
    const {
        idArticle,
        excludeNotas,
        action,
        nextIdArticle,
        listArticles,
        sizeMax = 20,
        api = false
    } = query;
    const arcSiteStorys = get(query, 'arc-site', null);
    let allArticles = action === 'activity' ? listArticles : excludeNotas;
    allArticles = allArticles?.replace('/', '') || '';
    allArticles = allArticles?.replace('[', '') || '';
    allArticles = allArticles?.replace(']', '') || '';

    const nextIdArticleClean = nextIdArticle?.match(/([A-Z0-9]+)/)?.[1];
    if (nextIdArticleClean && !!nextIdArticleClean) {
        allArticles = nextIdArticleClean.concat(',', allArticles);
    }
    const idArticleClean = idArticle && idArticle.replace('/', '');
    if (idArticle && !!idArticle) {
        allArticles = idArticleClean.concat(',', allArticles);
    }

    if (api && allArticles && !!allArticles) {
        const keyCachedcall = [
            allArticles?.replace(',', '*') || '',
            (sizeMax || 0).toString(),
            arcSiteStorys || ''
        ].join('-');

        return Promise.resolve(
            getUrlsbyIds(
                {
                    ...query,
                    allArticles,
                    idArticleClean,
                    keyCachedcall
                },
                cachedCall
            )
        ).then(resp => resolveData(resp));
    }

    return resolveData(query);
};

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
        sizeMax: 'text',
        api: 'bool',
        widgetName: 'text'
    },
    ttl: 120
};
