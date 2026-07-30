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
    const arcSite = get(query, 'arc-site', 'foodit');

    const resolveData = async () => {
        const url = `${CONTENT_BASE}${getUrlQuery(query)}`;

        const headers = {
            'Content-Type': 'application/json'
        };

        if (ARC_ACCESS_TOKEN) {
            headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await global.fetch(url, {
                method: 'GET',
                headers,
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${response.statusText}`
                );
            }

            const data = await response.json();

            const newData = await getAllImagesAuth(data, cachedCall);
            Object.assign(data, newData);

            // Se aplica este transform para sobrescribir el subtype por un error en composer que devuelve el name del subtype en lugar del value

            const translateSubtypeResponse = transformSubtype(data);

            const subtype = getArticleSubtype(
                get(translateSubtypeResponse, 'subtype', null)
            );

            return {
                ...translateSubtypeResponse,
                ...addResizedUrls(translateSubtypeResponse, {
                    presets: {
                        ...getImageConfig(translateSubtypeResponse, query)
                    },
                    subtype,
                    isInApertura: get(query, 'isInApertura', false),
                    isAdmin: get(query, 'isAdmin', false),
                    arcSite
                })
            };
        } catch (error) {
            if (error.name === 'AbortError') {
                logger.push(
                    'Request timed out',
                    {
                        source: 'content/source/articleSource',
                        url: get(query, 'url', '')
                    },
                    arcSite
                );
            } else {
                logger.push(
                    error,
                    {
                        source: 'content/source/articleSource',
                        url: get(query, 'url', '')
                    },
                    arcSite
                );
            }

            throw error;
        } finally {
            clearTimeout(timeoutId);
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
