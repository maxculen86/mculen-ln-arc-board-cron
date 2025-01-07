import get from '../../components/private/common/utils/get';
import acuTransformV2Format from './utils/pageSource/acumulados/v2/mobile/byTag/acuTransformV2Format';
import transformAcu from './utils/pageSource/acumulados/v2/mobile/byTag/transform';
import calculatePaginationValue from './utils/pageSource/acumulados/common/calculatePaginationValue';
import tagSource from './tagSource';
import NotFoundError from './utils/notFoundError';

const getSizeParamFromQuery = query => {
    // eslint-disable-next-line prefer-regex-literals
    const regexForSizeParam = new RegExp(/size:(\d+)/);
    const matchForSize = regexForSizeParam.exec(get(query, 'params', ''));
    if (matchForSize) {
        return matchForSize.length > 1 ? matchForSize[1] : 30;
    }
    return 30;
};

const getPageParamFromQuery = query => {
    // eslint-disable-next-line prefer-regex-literals
    const regexForPageParam = new RegExp(/page:(\d+)/);
    const matchForPageParam = regexForPageParam.exec(get(query, 'params', ''));

    const page =
        matchForPageParam && matchForPageParam.length > 1
            ? Number(matchForPageParam[1])
            : 1;

    if (page < 1) {
        throw new Error('Page parameter should be more than 1');
    }

    return page;
};

const fetch = async (query, { cachedCall } = {}) => {
    try {
        const queryAux = { ...query };
        queryAux.slug = query.slug?.replace('/', '');

        const size = getSizeParamFromQuery(queryAux);
        const page = getPageParamFromQuery(queryAux);

        const tagSourceResult = await tagSource.fetch(queryAux, { cachedCall });

        const queryParams = {
            size,
            page,
            tagId: queryAux.slug?.replace('/', ''),
            categoryUri: get(queryAux, 'categoryUri', '')?.replace('/', ''),
            versionUri: queryAux.versionUri,
            website: 'la-nacion-ar',
            tagSourceResult
        };

        const transformedAcu = await transformAcu(queryParams, { cachedCall });

        const paginationValue = calculatePaginationValue(
            transformedAcu[0].acumuladoTotal,
            size,
            page
        );

        return acuTransformV2Format(transformedAcu, paginationValue);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError(`Tag no encontrado: ${query.slug}`);
        }
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiAcuTagsSource : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );
        throw new Error(error);
    }
};

export default {
    fetch,
    params: {
        slug: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        categoryUri: 'text',
        versionUri: 'text',
        params: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
