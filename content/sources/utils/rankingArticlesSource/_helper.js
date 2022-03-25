import { RESIZER_KEY, RESIZER_URL, RANKING_URL } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer';
import config, { HOT_SECTION, COLD_SECTION, DEFAULT_SECTION } from './_config';
import get from '../../../../components/private/common/utils/get';
import getPresets from '../presets';

const STORY_QUERY_LIMIT = 30;
export const MINIMUM_ITEMS = 4;

export const getAnalitycUrls = (data = {}) => {
    const { stories } = data;
    if (!stories || stories.length === 0) return [];

    return stories.reduce((r, e) => {
        if (e && e.url) {
            const regexResult = /\/www.lanacion.com.ar(\/.*\/+.*nid\d{8}[^\?]+)(\?.*)?$/.exec(
                e.url.replace('#', '?')
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
    return size
        ? canonicalUrls.slice(
              0,
              size >= STORY_QUERY_LIMIT ? STORY_QUERY_LIMIT : size
          )
        : [];
};

export const resolveUri = key => {
    const arcSite = get(key, 'arc-site', 0);
    const days = get(key, 'days', 1);
    const stories = get(key, 'stories', []);
    const endDate = new Date();
    const startDate = Object.assign(new Date(), endDate);
    days && startDate.setDate(startDate.getDate() - days);
    const requestUri = `${RANKING_URL}/content/v4/search/published`;
    const includeFields =
        '_id,subtype,promo_items.basic,headlines.basic,headlines.mobile,subheadlines,canonical_url,body,related_content,website_url,label';
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

export const getQuery = sectionId => {
    const daysBySection = {
        [HOT_SECTION]: 2,
        [COLD_SECTION]: 7,
        [DEFAULT_SECTION]: 1
    };
    const { type, endpoint, days, name = '', size = MINIMUM_ITEMS } =
        config[sectionId] || config.home;
    return {
        endpoint: endpoint || `/most-readed-by-sections?Sections=${sectionId}`,
        days: days || daysBySection[type],
        name,
        size
    };
};

export const transformData = (data, query) => {
    const { presets, presetsDefault } = getPresets(query);
    const presetsPromoItems = get(presets, 'promo_items', null);
    return data.map(elem => {
        const headlines = get(elem, `headlines`, {});
        const promoItems = get(elem, `promo_items`);
        const websiteUrl = get(elem, `website_url`);
        const canonicalUrl = get(elem, `canonical_url`);
        const subtype = get(elem, `subtype`);
        const volanta = get(elem, `label.volanta`);
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
            ),
            headlines,
            website_url: websiteUrl || canonicalUrl,
            label: {
                volanta
            }
        };
    });
};

export const sortData = (articles, stories, size) =>
    stories.reduce((acc, story) => {
        if (acc.length >= size) return acc;
        const art = articles.find(article => article.canonical_url === story);
        art && acc.push(art);
        return acc;
    }, []);
