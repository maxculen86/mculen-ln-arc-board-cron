import request from 'request-promise-native';
import {
    CONTENT_BASE,
    RESIZER_KEY,
    RESIZER_URL,
    ARC_ACCESS_TOKEN
} from 'fusion:environment';
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import filter from '../filters/LN/nota/article';
import Redirect from './utils/redirect';

const resolve = (key, a) => {
    const { url, id, published } = key;
    console.log('*************************RESOLVE*********************');
    console.log('resolve -> url, id, published', url, id, published);

    const arcSite = key['arc-site'];
    let basePath = `/content/v4/stories/?website=${arcSite}`;

    if (published) basePath = `${basePath}&published=${published}`;

    if (id) return `${basePath}&_id=${id}`;
    if (url) return `${basePath}&website_url=${url}`;

    throw new Error('Debe definir url o id para obtener la nota');
};

const fetch = query => {
    console.log('*************************QUERY*********************');

    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt).then(response => {
        console.log('response', response);
        if (response.type === 'redirect' && response.redirect_url) {
            throw new Redirect(response.redirect_url, 301);
        }

        return transform(response, query);
    });
};

const transform = (data, siteProps) => {
    console.log('*************************TRANSFORM*********************');
    const arcSite = siteProps['arc-site'];
    const properties = getProperties(arcSite);

    const presetsDefault = get(properties, `imageConfig.resize.default`, null);
    const presetsXL = get(properties, `imageConfig.resize.xl`, null);
    const presetsL = get(properties, `imageConfig.resize.l`, null);

    const resp = addResizedUrls(data, {
        resizerSecret: RESIZER_KEY,
        resizerUrl: RESIZER_URL,
        presets: {
            promoItems: presetsXL.promo_items || presetsDefault,
            contentElements: presetsL.content_elements || presetsDefault,
            presetsDefault
        }
    });

    console.log('transform -> resp', resp);
    return resp;
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text'
    },
    filter,
    ttl: sourceSetting.articleSourceHome.ttl
};
