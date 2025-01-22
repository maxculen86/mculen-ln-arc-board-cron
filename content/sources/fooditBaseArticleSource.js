import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import {
    getUrlQuery,
    transformSubtype
} from './utils/articleSourceNota/_helper';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth';
import {
    getArticleSubtype,
    getImageConfig
} from './utils/fooditSources/fooditArticleSource/index';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';

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

            // Se aplica este transform para sobrescribir el subtype por un error en composer que devuelve el name del subtype en lugar del value
            const traslateSubypeResponse = transformSubtype(response);

            const subtype = getArticleSubtype(
                get(traslateSubypeResponse, 'subtype', null)
            );

            return {
                ...traslateSubypeResponse,
                ...addResizedUrls(traslateSubypeResponse, {
                    presets: {
                        ...getImageConfig(traslateSubypeResponse, query)
                    },
                    subtype,
                    isInApertura: get(query, 'isInApertura', false),
                    isAdmin: get(query, 'isAdmin', false),
                    arcSite
                })
            };
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
        isInApertura: 'bool',
        imageConfig: 'text'
    },
    ttl: 600
};
