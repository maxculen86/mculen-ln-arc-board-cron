import { SITE_FOODIT, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { transform } from './utils/fooditSources/fooditArticleSource';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger.js';
import { setRedirect } from './utils/articleSourceNota/_helper';
import fooditBaseArticleSource from './fooditBaseArticleSource.js';
import filter from '../filters/foodit/article/articleFilterNota.js';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];

    const resolveData = async () => {
        try {
            const response = await cachedCall(
                'fooditBaseArticleSource',
                fooditBaseArticleSource.fetch,
                {
                    query,
                    independent: true
                }
            );

            setRedirect({
                response,
                query,
                siteUrl: SITE_FOODIT,
                paywallUrl: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4/?cv=800&fc=825`
            });

            return transform(response, query, cachedCall);
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/source/fooditArticleSource',
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
        meteringVariant: 'text',
        paywallUrl: 'text',
        paywallEnabled: 'text',
        imageConfig: 'text',
        outputType: 'text',
        sourceInclude: 'text'
    },
    filter,
    ttl: 120
};
