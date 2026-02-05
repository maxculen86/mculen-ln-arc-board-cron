import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import home from '../../components/private/LN/api/v2/mobile/homeAccumulated';
import NotFoundError from './utils/notFoundError';
import pageTransformV2Format from './utils/pageSource/acumulados/v2/mobile/byTag/pageTransformV2Format';
import pages from './utils/pageSource/index';
import transform from './utils/pageSource/pageAcumulados/v2/mobile/transform';

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri } = query;
    const ticksCache = get(query, 'ticks', '').replace('/', '');
    const categoryUri = get(query, 'categoryUri', '').replace('/', '');
    const versionDeploy = get(query, 'versionDeploy', null);
    const cookie = get(query, 'cookie', '');
    const slug = get(query, 'slug', '').replace('/', '');

    if (!versionUri) {
        throw new Error('The api page must have a version');
    }

    return {
        uri,
        website,
        versionUri,
        ticksCache,
        categoryUri,
        slug,
        cookie,
        versionDeploy
    };
};

const fetch = async (query, { cachedCall }) => {
    try {
        const {
            uri,
            website,
            versionUri,
            ticksCache,
            categoryUri,
            slug,
            cookie,
            versionDeploy
        } = getParamsFromQuery(query);

        const queryParams = {
            rootPath: `${SITE_LANACION}/tema/${slug}`,
            ticksCache: ticksCache.toString(),
            website,
            uri,
            title: slug,
            categoryUri,
            versionUri,
            cookie,
            versionDeploy
        };

        const resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
            query: queryParams,
            ttl: 120
        });

        // Para revisar la data cruda que viene del Layout
        // return resultPage;
        const { information } = resultPage;

        const resultPageTransform = await transform(resultPage);

        // Para revisar la data formateada con la informacion de todas la secciones
        // return resultPageTransform;
        queryParams.information = information;
        const resultHomeTransformation = home(resultPageTransform, queryParams);

        // Para revisar la data despues del transform, estructura final
        const resultPageData = Array.isArray(resultHomeTransformation)
            ? resultHomeTransformation[0]
            : {};

        return pageTransformV2Format(resultPageData);
    } catch (error) {
        console.warn(
            `LnWarn: Error in content/sources/apiPageAcumuladoTags : 
                    query parameters: ${JSON.stringify(query)} 
                    - errorMsj: ${error.message}`
        );

        if (error instanceof NotFoundError) {
            throw new NotFoundError(`Tag no encontrado: ${query.slug}`);
        }

        throw new Error(error);
    }
};

export default {
    fetch,
    params: {
        website: 'text',
        slug: 'text',
        params: 'text',
        categoryUri: 'text',
        versionUri: 'text',
        ticks: 'text',
        cookie: 'text',
        versionDeploy: 'text'
    },
    ttl: 120
};
