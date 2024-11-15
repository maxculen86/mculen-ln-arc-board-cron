import request from 'request-promise-native';
import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    SITE_LANACION,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import filter from '../filters/LN/nota/articleListenable';
import logger from '../../components/private/common/utils/logger';
import {
    getUrlQuery,
    setRedirect,
    transform,
    updateUrlIfMatch,
    getIncludedFields
} from './utils/articleSourceNota/_helper';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    query.url = updateUrlIfMatch(query.url);
    query.uri = updateUrlIfMatch(query.uri);

    if (query.isHome) {
        query.sourceInclude = getIncludedFields(query.isLiveblog || false);
    }

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
                siteUrl: SITE_LANACION,
                paywallUrl: `${SITIO_SEGURO_REGISTRACION}/suscripcion/E/1/1/?callback=`
            });

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
        sourceInclude: 'text',
        imageConfig: 'text',
        diagramation: 'text',
        isInApertura: 'bool',
        checkExclusiveAccess: 'bool',
        isAdmin: 'bool',
        uri: 'text',
        ticks: 'text'
    },
    filter,
    ttl: 120
};
