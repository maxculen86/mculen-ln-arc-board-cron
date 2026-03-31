import { CONTENT_BASE } from 'fusion:environment';
import getProperties from 'fusion:properties';
import getRequest from './utils/getRequest';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import { normalizeNumericRatingElements } from './utils/common/normalizeNumericRating';
import {
    getImageConfig,
    getUrlQuery,
    transformSubtype
} from './utils/articleSourceNota/_helper';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth';
import { getArticleSubtype } from './utils/fooditSources/fooditArticleSource/index';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import { processVolanta } from './utils/common/volantaHelper';

const fetch = (query = {}, { cachedCall } = {}) => {
    const arcSite = query['arc-site'];
    const siteProperties = getProperties(arcSite);

    const resolveData = async () => {
        try {
            const response = await getRequest(
                `${CONTENT_BASE}${getUrlQuery(query)}`
            );

            const newData = await getAllImagesAuth(response, cachedCall);
            Object.assign(response, newData);

            const translateSubtypeResponse = transformSubtype(response);
            const normalizedResponse = {
                ...translateSubtypeResponse,
                content_elements: normalizeNumericRatingElements(
                    get(translateSubtypeResponse, 'content_elements', [])
                )
            };
            const subtype = getArticleSubtype(
                get(normalizedResponse, 'subtype', null)
            );
            const label = processVolanta(normalizedResponse);

            return {
                ...normalizedResponse,
                ...addResizedUrls(normalizedResponse, {
                    ...getImageConfig({
                        response: normalizedResponse,
                        siteProperties,
                        imageConfig: query.imageConfig
                    }),
                    subtype,
                    isInApertura: get(query, 'isInApertura', false),
                    isAdmin: get(query, 'isAdmin', false),
                    arcSite
                }),
                label
            };
        } catch (error) {
            logger.push(
                error,
                {
                    source: 'content/sources/lnHomeBaseArticleSource',
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
    ttl: 120
};
