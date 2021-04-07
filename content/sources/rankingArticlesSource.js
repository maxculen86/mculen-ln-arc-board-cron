import request from 'request-promise-native';
import {
    RANKING_URL,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN,
    CONTENT_BASE,
    API_ENV
} from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import getPresets from './utils/presets';
import get from '../../components/private/common/utils/get';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import Redirect from './utils/redirect';
import { isNotRecommend } from './utils/collectionsHelper';

const resolve = (key, a) => {
    const { sectionId, website, daysAgo = 1 } = key;
    const sizeNumber = 10;
    const arcSite = key['arc-site'];
    const basePath = `?website=${website || arcSite}`;
    const sectionFilter = sectionId ? `category${sectionId}` : '';
    const offsetFilter = daysAgo ? `&offset=${daysAgo}` : '';
    const finalPath = `/feeds/most-read/${sectionFilter}/${basePath}&size=${sizeNumber}${offsetFilter}`;
    console.log("🚀 ~ file: rankingArticlesSource.js ~ line 28 ~ resolve ~ finalPath", finalPath)
    return finalPath;
};

const fetch = query => {
    const baseUrl = API_ENV === 'prod' ? CONTENT_BASE : RANKING_URL;
    const opt = {
        uri: `${baseUrl}${resolve(query)}`,
        json: true
    };

    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt).then((response = {}) => {
        console.log("🚀 ~ file: rankingArticlesSource.js ~ line 46 ~ returnrequest ~ response", response)
        if (response.type === 'redirect' && response.redirect_url) {
            throw new Redirect(response.redirect_url, 301);
        }

        const forwardUrl = get(
            response,
            'related_content.redirect[0].redirect_url'
        );

        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        if (forwardUrl && regExp.test(forwardUrl)) {
            throw new Redirect(forwardUrl, 301);
        }

        return response && transform(response, query);
    });
};

const transform = (data, siteProps) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const resp = {
        content_elements:
            data.content_elements &&
            data.content_elements
                .filter(art => !isNotRecommend(art))
                .slice(0, siteProps.size)
                .map(elem => {
                    const headlines = get(elem, `headlines`, {});
                    const shortTitle = get(elem, `headlines.mobile`, null);
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
                        ),
                        headlines: {
                            ...headlines,
                            shortTitle
                        }
                    };
                })
    };
    return resp;
};

export default {
    fetch,
    params: {
        sectionId: 'text',
        size: 'number',
        website: 'text'
    },
    ttl: 120 // 3600
};
