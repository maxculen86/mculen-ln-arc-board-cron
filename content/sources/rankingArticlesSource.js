import request from 'request-promise-native';
import {
    CONTENT_BASE,
    RANKING_URL,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN
} from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import Redirect from './utils/redirect';

const resolve = (key, a) => {
    const {
        sectionId,
        size,
        website,
        weeksAgo = 1,
        daysAgo = 1,
        includedFields
    } = key;
    const arcSite = key['arc-site'];
    const basePath = `?website=${website || arcSite}`;
    // const basePath = `/arcio/ans/most-read/?website=${website || arcSite}`;

    const sectionFilter = sectionId
        ? `+AND+taxonomy.primary_section._id:"${sectionId}"`
        : '';

    const publishDateFilter = weeksAgo
        ? `+AND+first_publish_date:[now-${weeksAgo}w+TO+now]`
        : '';

    const offsetFilter = daysAgo ? `&offset=${daysAgo}` : '';

    const query = `&query=type:story+AND+revision.published:true${sectionFilter}${publishDateFilter}${offsetFilter}`;

    const includedFieldsFilter = includedFields
        ? `&included_fields=${includedFields}`
        : '';

    const finalPath = `${basePath}${query}${includedFieldsFilter}&size=${size ||
        3}&sort=first_publish_date:desc`;

    // return `https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/arcio/ans/most-read/?website=la-nacion-ar&query=type:story+AND+revision.published:true+AND+taxonomy.primary_section._id:"/politica"+AND+first_publish_date:[now-30w+TO+now]&offset=5&included_fields=website_url,headlines.basic,credits.by,display_date&size=${size}&sort=first_publish_date:desc`;
    return finalPath;
};

const fetch = query => {
    // const uri = `${resolve(query)}`;
    const uri = `${RANKING_URL}${resolve(query)}`;
    console.log('****** REQUEST URI', uri);
    const opt = {
        uri,
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

    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsM = get(properties, `imageConfig.resize.m`, null);

    const resp = {
        content_elements: data.map(v =>
            addResizedUrls(v, {
                resizerSecret: RESIZER_KEY,
                resizerUrl: RESIZER_URL,
                presets: {
                    promoItems: presetsM.promo_items || presetsDefault,
                    contentElements:
                        presetsM.content_elements || presetsDefault,
                    presetsDefault
                }
            })
        )
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
