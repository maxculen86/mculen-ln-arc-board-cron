import get from '../../components/private/common/utils/get';
import acuTransformV2Format from './utils/pageSource/acumulados/v2/mobile/byTag/acuTransformV2Format';
import transformAcu from './utils/pageSource/acumulados/v2/mobile/byTag/transform';
import calculatePaginationValue from './utils/pageSource/acumulados/common/calculatePaginationValue';
import tagSource from './tagSource';

const fetch = async (query, { cachedCall }) => {
    try {
        query.slug = query.slug.replace('/', '');

        const size = getSizeParamFromQuery(query);
        const page = getPageParamFromQuery(query);

        const tagSourceResult = await tagSource.fetch(query, { cachedCall });

        const queryParams = {
            size,
            page,
            tagId: query.slug.replace('/', ''),
            categoryUri: get(query, 'categoryUri', '').replace('/', ''),
            versionUri: query.versionUri,
            website: 'la-nacion-ar',
            tagSourceResult
        };

        const transformedAcu = await transformAcu(queryParams);

        const paginationValue = calculatePaginationValue(
            transformedAcu[0].acumuladoTotal,
            size,
            page
        );

        return acuTransformV2Format(transformedAcu, paginationValue);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiAcuTagsSource : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );
        throw new Error(error);
    }
};

const getSizeParamFromQuery = query => {
    const regexForSizeParam = new RegExp(/size:(\d+)/);
    const matchForSize = regexForSizeParam.exec(get(query, 'params', ''));
    const size = matchForSize && matchForSize.length > 1 ? matchForSize[1] : 30;
    return size;
};

const getPageParamFromQuery = query => {
    const regexForPageParam = new RegExp(/page:(\d+)/);
    const matchForPageParam = regexForPageParam.exec(get(query, 'params', ''));

    const page =
        matchForPageParam && matchForPageParam.length > 1
            ? parseInt(matchForPageParam[1])
            : 1;

    if (page < 1) {
        throw new Error('Page parameter should be more than 1');
    }

    return page;
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
