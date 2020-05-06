import get from 'lodash.get';
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
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
        const url = get(response, 'content_elements[0].website_url');
        if (!url) {
            return ArticleSourceNota.fetch(query);
        }
        throw new Redirect(url, 301);
    });
};

const resolve = key => {
    const { url } = key;

    const id = url.replace(/\//g, '');
    const arcSite = key['arc-site'];
    const basePath = `/content/v4/search/published/?website=${arcSite}&body={
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "type": "story"
                        }
                    },
                    {
                        "term": {
                            "source.source_id": "${id}"
                        }
                    }
                ]
            }
        }
    }`;
    return basePath;
};

export default {
    fetch,
    params: {
        url: 'text'
    }
};
