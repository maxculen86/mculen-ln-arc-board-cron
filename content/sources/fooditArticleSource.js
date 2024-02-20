import request from 'request-promise-native';
import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    SITE_FOODIT,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import { transform } from './utils/fooditSources/fooditArticleSource';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger.js';
import { getUrlQuery, setRedirect } from './utils/articleSourceNota/_helper';

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

            setRedirect({
                response,
                query,
                siteUrl: SITE_FOODIT,
                paywallUrl: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/3/`
            });

            return transform(response, query, cachedCall);
        } catch (error) {
            return logger.push(
                error,
                {
                    source: 'content/source/fooditArticleSource',
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
        imageConfig: 'text',
        outputType: 'text',
        sourceInclude: 'text'
    },
    // TODO: Una vez que esten definidas las fichas, definir filtro correspondiente.
    // filter,
    ttl: 120
};
