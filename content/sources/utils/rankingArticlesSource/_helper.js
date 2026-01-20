import { RESIZER_KEY, ARC_ACCESS_TOKEN_PROD } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import config, { HOT_SECTION, COLD_SECTION, DEFAULT_SECTION } from './_config';
import get from '../../../../components/private/common/utils/get';
import getPresets from '../presets';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';

const BASE_ARC_SERVICES_URL =
    'https://arcservices.lanacion.com.ar/api/v1/analytics';
const CONTENT_BASE_PROD = 'https://api.lanacionar.arcpublishing.com';
const RESIZER_URL_PUBLIC_PROD = 'https://resizer.glanacion.com';
const STORY_QUERY_LIMIT = 30;
export const MINIMUM_ITEMS = 4;

export const getAnalitycUrls = (data = {}) => {
    const { stories } = data;
    if (!stories || stories.length === 0) return [];

    return stories.reduce((r, e) => {
        if (e && e.url) {
            const regexResult =
                // eslint-disable-next-line no-useless-escape
                /\/www.lanacion.com.ar(\/.*\/+.*nid\d{8}[^\?]+)(\?.*)?$/.exec(
                    e.url?.replace('#', '?')
                );
            if (regexResult && regexResult[1] && !r.includes(regexResult[1])) {
                const lastChar = regexResult[1].substring(
                    regexResult[1].length - 1
                );
                r.push(`${regexResult[1]}${lastChar !== '/' ? '/' : ''}`);
            }
        }
        return r;
    }, []);
};

export const getCanonicalUrls = data => {
    const canonicalUrls = getAnalitycUrls(data);
    const size = get(canonicalUrls, 'length', 0);
    if (size) {
        return canonicalUrls.slice(
            0,
            size >= STORY_QUERY_LIMIT ? STORY_QUERY_LIMIT : size
        );
    }
    return [];
};

export const resolveUri = key => {
    const arcSite = get(key, 'arc-site', 0);
    const days = get(key, 'days', 1);
    const stories = get(key, 'stories', []);
    const endDate = new Date();
    const startDate = Object.assign(new Date(), endDate);

    if (days) startDate.setDate(startDate.getDate() - days);

    const requestUri = `${CONTENT_BASE_PROD}/content/v4/search/published`;
    const includeFields =
        '_id,subtype,promo_items.basic,promo_items.audio_nota.embed.config.audio_status,headlines.basic,headlines.mobile,headlines.web,subheadlines,canonical_url,body,related_content,website_url,label,first_publish_date,display_date,source.system,label.republicar_audio, taxonomy.primary_section,planning';
    const uriParams = [
        `website=${arcSite}`,
        `size=${stories.length}`,
        `_sourceInclude=${includeFields}`
    ].join('&');

    const body = {
        query: {
            bool: {
                must: [
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
                        exists: {
                            field: 'promo_items.basic'
                        }
                    }
                ],
                filter: {
                    terms: {
                        canonical_url: stories
                    }
                }
            }
        }
    };
    const encodedBody = encodeURI(JSON.stringify(body));
    return `${requestUri}?${uriParams}&body=${encodedBody}`;
};

// TODO: testear getQuery con la nueva lógica de layout

export const getQuery = (sectionId, layout) => {
    const daysBySection = {
        [HOT_SECTION]: 2,
        [COLD_SECTION]: 7,
        [DEFAULT_SECTION]: 1
    };

    const { layoutsName = {} } = siteConfig;
    const finalSize =
        layoutsName.HomeLN10 === layout ? MINIMUM_ITEMS + 1 : MINIMUM_ITEMS;

    const {
        type,
        endpoint,
        days,
        name = '',
        size = finalSize
    } = config[sectionId] || config.home;
    return {
        endpoint: endpoint || `/most-readed-by-sections?Sections=${sectionId}`,
        days: days || daysBySection[type],
        name,
        size
    };
};

const sizesRankingCommon = {
    0: {
        sizes: [
            {
                width: 300,
                height: 130,
                useFullSize: true
            }
        ]
    },
    default: {
        sizes: [
            {
                width: 120,
                height: 120,
                useFullSize: true
            }
        ]
    }
};

export const transformData = (data, query, cachedCall) => {
    const { section = '' } = query;
    const { presets, presetsDefault } = getPresets(query);
    const presetsPromoItems = get(presets, 'promo_items', null);

    return Promise.all(
        data.map(async (elem, i) => {
            const newElem = await getAllImagesAuth(elem, cachedCall);
            Object.assign(elem, newElem);

            const headlines = get(elem, `headlines`, {});
            const promoItems = get(elem, `promo_items`);
            const websiteUrl = get(elem, `website_url`);
            const canonicalUrl = get(elem, `canonical_url`);
            const subtype = get(elem, `subtype`);
            const headlinesWeb = get(elem, `headlines.web`);
            const volanta = headlinesWeb || get(elem, `label.volanta`);
            const republicarAudio = get(elem, `label.republicar_audio`);
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
                        resizerUrl: RESIZER_URL_PUBLIC_PROD,
                        presets: {
                            promoItems:
                                section === 'commonRanking'
                                    ? get(
                                          sizesRankingCommon,
                                          i,
                                          sizesRankingCommon.default
                                      )
                                    : presetsPromoItems,
                            presetsDefault
                        },
                        // Se pasa el subtype para que las notas de foto al 100
                        // y storytelling no sean excluidas de las validaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype
                    }
                ),
                headlines,
                website_url: websiteUrl || canonicalUrl,
                label: {
                    volanta,
                    republicar_audio: republicarAudio
                }
            };
        })
    );
};

export const sortData = (articles, stories, size) =>
    articles
        .filter(article => stories.includes(article.canonical_url))
        .slice(0, size);

export const getQueryData = query => {
    const { sectionId, layout, arcSite } = query;
    const newQuery = { ...query, ...getQuery(sectionId, layout) };
    const { endpoint, size, name } = newQuery;
    const uriArcServicesAPI = `${BASE_ARC_SERVICES_URL}${endpoint}`;
    const isApiFetch = get(query, 'api', false);
    return {
        sectionId,
        layout,
        endpoint,
        size,
        uriArcServicesAPI,
        newQuery,
        arcSite,
        isApiFetch,
        name
    };
};

export const getServicesRequest = (query, stories) => {
    const uri = resolveUri({
        ...query,
        stories
    });

    const servicesRequest = {
        uri,
        json: true
    };

    if (ARC_ACCESS_TOKEN_PROD) {
        servicesRequest.auth = {
            bearer: ARC_ACCESS_TOKEN_PROD
        };
    }

    return { servicesRequest, uri };
};
