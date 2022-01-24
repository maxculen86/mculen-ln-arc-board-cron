import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import Redirect from './utils/redirect';
import ArticleSourceNota from './articleSourceNota';

const fetch = query => {
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
        const url = get(response, 'content_elements[0].canonical_url');
        if (!url) {
            return ArticleSourceNota.fetch(query);
        }
        throw new Redirect(url, 301);
    });
};

const resolve = key => {
    const { url } = key;
    const id = new RegExp('/([0-9]+)').exec(url)[1];

    const arcSite = key['arc-site'];
    return `/content/v4/search/published/?website=${arcSite}&q=type:story+AND+source.source_id:${id}&_sourceInclude=canonical_url`;
};

export default {
    fetch,
    params: {
        url: 'text'
    },
    ttl: 900
};
