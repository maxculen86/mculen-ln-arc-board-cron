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
    getIncludedFields,
    transformSubtype
} from './utils/articleSourceNota/_helper';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const fetch = (query, { cachedCall } = {}) => {
    const queryAux = query;
    const arcSite = queryAux['arc-site'];

    queryAux.url = updateUrlIfMatch(queryAux.url);
    queryAux.uri = updateUrlIfMatch(queryAux.uri);
    if (queryAux.isHome) {
        queryAux.sourceInclude = getIncludedFields(
            queryAux.isLiveblog || false
        );
    }

    const opt = {
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `${CONTENT_BASE}${getUrlQuery(queryAux)}`,
                opt
            );
            handleHttpError(response);
            const data = await response.json();
            const externalApiRedirectUrl = setRedirect({
                response: data,
                query: queryAux,
                siteUrl: SITE_LANACION,
                paywallUrl: `${SITIO_SEGURO_REGISTRACION}/suscripcion/E/1/1/?callback=`
            });
            if (
                externalApiRedirectUrl &&
                Object.keys(externalApiRedirectUrl).length !== 0
            )
                return { externalApiRedirectUrl };
            // Se aplica este transform para sobrescribir el subtype por un error en composer que devuelve el name del subtype en lugar del value
            const traslateSubypeResponse = transformSubtype(data);

            return transform(traslateSubypeResponse, queryAux, cachedCall);
        } catch (error) {
            return logger.push(
                error,
                {
                    source: 'content/source/ArticleSourceNota',
                    url: get(queryAux, 'url', '')
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
        checkoutEnabled: 'text',
        outputType: 'text',
        sourceInclude: 'text',
        imageConfig: 'text',
        diagramation: 'text',
        isInApertura: 'bool',
        checkExclusiveAccess: 'bool',
        isAdmin: 'bool',
        uri: 'text',
        ticks: 'text',
        isApi: 'bool'
    },
    filter,
    ttl: 120
};
