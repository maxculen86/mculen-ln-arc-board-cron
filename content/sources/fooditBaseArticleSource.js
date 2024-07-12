import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get.js';
import logger from '../../components/private/common/utils/logger.js';
import { getUrlQuery } from './utils/articleSourceNota/_helper.js';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth.js';
import { getArticleSubtype } from './utils/fooditSources/fooditArticleSource/index.js';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls.js';
import { getImageConfig } from './utils/fooditSources/fooditArticleSource/index.js';

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

            const newData = await getAllImagesAuth(response, cachedCall);
            Object.assign(response, newData);

            const subtype = getArticleSubtype(get(response, 'subtype', null));

            const result = {
                ...response,
                ...addResizedUrls(response, {
                    presets: {
                        ...getImageConfig(response, query)
                    },
                    subtype,
                    isInApertura: get(query, 'isInApertura', false),
                    isAdmin: get(query, 'isAdmin', false),
                    shouldUseV1: false,
                    shouldUseV2: true,
                    arcSite
                })
            };

            return result;
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/source/articleSource',
                    url: get(query, 'url', '')
                },
                arcSite
            );
            return {};
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
        outputType: 'text',
        sourceInclude: 'text',
        isInApertura: 'bool'
    },
    ttl: 3600
};
