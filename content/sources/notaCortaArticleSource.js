import get from 'lodash.get';
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import Redirect from './utils/redirect';
import NotFound from './utils/notFound';

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
            throw new NotFound();
        } else {
            throw new Redirect(url, 301);
        }
    });
};

const resolve = key => {
    const { id } = key;

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
        id: 'text'
    }
};
