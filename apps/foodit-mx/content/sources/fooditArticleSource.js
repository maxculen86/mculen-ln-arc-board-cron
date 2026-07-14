import { SITE_FOODIT, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { transform } from './utils/fooditSources/fooditArticleSource';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import { setRedirect } from './utils/articleSourceNota/_helper';
import fooditBaseArticleSource from './fooditBaseArticleSource';
import filter from '../filters/foodit/article/articleFilterNota';
import {
    RECETA,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import { paywallSoftConfigCallbackContentElements } from './utils/fooditSources/fooditArticleSource/_configs';

const fetch = (query, { cachedCall } = {}) => {
    const arcSite = get(query, 'arc-site', 'foodit');
    const queryWithArcSite = { ...query, 'arc-site': arcSite };

    const resolveData = async () => {
        try {
            const response = await cachedCall(
                'fooditBaseArticleSource',
                fooditBaseArticleSource.fetch,
                {
                    query: queryWithArcSite,
                    independent: true
                }
            );

            const isReceta = get(response, 'subtype', null) === RECETA;
            const isNote = get(response, 'subtype', null) === STORYTELLING;

            const isPaywallSoftEnabled =
                get(queryWithArcSite, 'paywallSoftEnabled') === '1';

            const isExclusiveSuscriptor =
                (isReceta || isNote) &&
                isPaywallSoftEnabled &&
                get(queryWithArcSite, 'meteringVariant') !== 'S' &&
                get(response, 'content_restrictions.content_code') ===
                    'cerrada';

            const customCallbacksConfig = isExclusiveSuscriptor
                ? {
                      isExclusiveSuscriptor,
                      customConfigCallbackContentElements:
                          paywallSoftConfigCallbackContentElements
                  }
                : {};

            if (!(isReceta || isNote) || !isPaywallSoftEnabled)
                setRedirect({
                    response,
                    query: queryWithArcSite,
                    siteUrl: SITE_FOODIT,
                    paywallUrl: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4/?cv=800&fc=825&callback=`
                });

            return transform(
                response,
                queryWithArcSite,
                cachedCall,
                customCallbacksConfig
            );
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/source/fooditArticleSource',
                    url: get(queryWithArcSite, 'url', '')
                },
                arcSite
            );
            throw error;
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
        paywallSoftEnabled: 'text',
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
    ttl: 600
};
