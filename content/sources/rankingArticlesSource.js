import request from 'request-promise-native';
import {
    RANKING_URL,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN
} from 'fusion:environment';
import getProperties from 'fusion:properties';
import get from '../../components/private/common/utils/get';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import Redirect from './utils/redirect';

const resolve = (key, a) => {
    const { sectionId, size, website, weeksAgo = 1, daysAgo = 1 } = key;
    const arcSite = key['arc-site'];
    const basePath = `?website=${website || arcSite}`;

    const sectionFilter = sectionId
        ? `+AND+taxonomy.sections._id:"${sectionId}"`
        : '';

    const publishDateFilter = weeksAgo
        ? `+AND+first_publish_date:[now-${weeksAgo}w+TO+now]`
        : '';

    const offsetFilter = daysAgo ? `&offset=${daysAgo}` : '';

    const query = `&query=type:story+AND+revision.published:true${sectionFilter}${publishDateFilter}${offsetFilter}`;

    const finalPath = `${basePath}${query}&size=${size || 3}`;
    return finalPath;
};

const fetch = query => {
    const opt = {
        uri: `${RANKING_URL}${resolve(query)}`,
        json: true
    };

    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt).then(response => {
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

        return transform(response, query);
    });
};

const transform = (data, siteProps) => {
    const properties = getProperties(siteProps['arc-site']);

    const presetsDefault = get(properties, 'imageConfig.resize.default', null);
    const presetsSize = get(siteProps, 'imageConfig', 'default');
    const presets = get(properties, `imageConfig.resize.${presetsSize}`, null);

    const presetsPromoItems = get(presets, 'promo_items', null);
    const presetsContentElement = get(presets, 'content_elements', null);
    const presetsCredits = get(presets, 'credits', null);

    const resp = {
        content_elements: data.map(v => {
            const headlines = get(v, `headlines`, {});
            const shortTitle = get(v, `headlines.mobile`, null);

            return {
                ...addResizedUrls(v, {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems || presetsDefault,
                        contentElements:
                            presetsContentElement || presetsDefault,
                        credits: presetsCredits,
                        presetsDefault
                    }
                }),
                headlines: { ...headlines, shortTitle }
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
    ttl: sourceSetting.rankingArticlesSource.ttl
};
