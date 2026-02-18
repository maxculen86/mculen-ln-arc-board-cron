import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import transform from './utils/pageSource/pageAcumulados/v2/mobile/transform';
import home from '../../components/private/LN/api/v2/mobile/homeAccumulated';
import pageTransformV2Format from './utils/pageSource/acumulados/v2/mobile/byAuthor/pageTransformV2Format';
import NotFoundError from './utils/notFoundError';

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri } = query;
    const ticksCache = get(query, 'ticks', '').replace('/', '');
    const categoryUri = get(query, 'categoryUri', '').replace('/', '');

    const authorId = get(query, 'authorId', '').replace('/', '');
    const versionDeploy = get(query, 'versionDeploy', null);
    const cookie = get(query, 'cookie', '');

    if (!versionUri) {
        throw new Error('The api page must have a version');
    }

    return {
        uri,
        website,
        versionUri,
        ticksCache,
        categoryUri,
        authorId,
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
            authorId,
            cookie,
            versionDeploy
        } = getParamsFromQuery(query);

        const queryParams = {
            rootPath: `${SITE_LANACION}/autor/${authorId}`,
            ticksCache: ticksCache.toString(),
            website,
            uri,
            categoryUri,
            versionUri,
            cookie,
            versionDeploy
        };

        const resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
            query: queryParams,
            ttl: 120
        });

        const { information } = resultPage;

        const resultPageTransform = await transform(resultPage);

        queryParams.information = information;
        const resultHomeTransformation = home(resultPageTransform, queryParams);

        const resultPageData = Array.isArray(resultHomeTransformation)
            ? resultHomeTransformation[0]
            : {};

        return pageTransformV2Format(resultPageData);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiPageAcumuladoAuthors : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );

        if (error instanceof NotFoundError) {
            throw new NotFoundError(`Author not found: ${query.authorId}`);
        }

        throw new Error(error);
    }
};

export default {
    fetch,
    params: {
        website: 'text',
        authorId: 'text',
        params: 'text',
        categoryUri: 'text',
        versionUri: 'text',
        ticks: 'text',
        cookie: 'text',
        versionDeploy: 'text'
    },
    ttl: 120
};
