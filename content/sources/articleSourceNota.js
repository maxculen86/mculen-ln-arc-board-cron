import request from 'request-promise-native';
import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import filter from '../filters/LN/nota/articleListenable';
import logger from '../../components/private/common/utils/logger';
import {
    getUrlQuery,
    setRedirect,
    transform
} from './utils/articleSourceNota/_helper';
import { isSubtypeWithAmp } from '../../components/private/common/utils/subtypes/subtypeHelper';
import force404AMP from './utils/force404AMP';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    const opt = {
        uri: `${CONTENT_BASE}${getUrlQuery(query)}`,
        json: true
    };

    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    const resolveData = async () => {
        try {
            const response = await request(opt);

            isSubtypeWithAmp(response) &&
                force404AMP({ outputType: get(query, 'outputType', '') });

            setRedirect({ response, query, siteUrl: SITE_LANACION });

            return transform(response, query, cachedCall);
        } catch (error) {
            return logger.push(
                error,
                {
                    source: 'content/source/ArticleSourceNota',
                    url: get(query, 'url', '')
                },
                arcSite
            );
        }
    };

    return Promise.resolve(resolveData());
};

export default {
    fetch,
    params: {
        url: 'text',
        id: 'text',
        published: 'text',
        meteringVariant: 'text',
        paywallUrl: 'text',
        paywallEnabled: 'text',
        outputType: 'text',
        sourceInclude: 'text'
    },
    filter,
    ttl: 120
};
