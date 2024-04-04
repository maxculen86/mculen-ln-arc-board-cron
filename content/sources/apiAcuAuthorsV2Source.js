import get from '../../components/private/common/utils/get';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import acuTransformV2Format from './utils/pageSource/acumulados/v2/mobile/byAuthor/acuTransformV2Format';
import transformAcu from './utils/pageSource/acumulados/common/transformAcuV1';
import calculatePaginationValue from './utils/pageSource/acumulados/common/calculatePaginationValue';
import authorSource from './authorSource';
import request from 'request-promise-native';
import NotFoundError from './utils/notFoundError';
import logger from '../../components/private/common/utils/logger';

const fetch = async (query, { cachedCall }) => {
    try {
        const size = getSizeParamFromQuery(query);
        const page = getPageParamFromQuery(query);

        const queryParams = {
            size,
            page,
            authorId: query.authorId.replace('/', ''),
            categoryUri: get(query, 'categoryUri', '').replace('/', ''),
            versionUri: query.versionUri,
            website: 'la-nacion-ar'
        };

        const authorData = await authorSource
            .fetch(
                {
                    website: 'la-nacion-ar',
                    outputType: 'json',
                    _id: query.authorId.replace('/', '')
                },
                { cachedCall }
            )
            .then(resp => {
                return resp;
            })
            .catch(error => {
                logger.push(
                    error,
                    {
                        source: 'content/sources/apiAcuAuthorsV2Source',
                        query
                    },
                    query['arc-site']
                );
            });

        const transformedAcu = await transformAcu(queryParams, { cachedCall });

        const paginationValue = calculatePaginationValue(
            transformedAcu[0].acumuladoTotal,
            size,
            page
        );

        return acuTransformV2Format(
            transformedAcu,
            authorData,
            paginationValue,
            page === 1
        );
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError(`Author not found: ${query.authorId}`);
        }
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiAcuAuthorsV2Source : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );
        throw new Error(error);
    }
};

const getSizeParamFromQuery = query => {
    const regexForSizeParam = new RegExp(/size:(\d+)/);
    const matchForSize = regexForSizeParam.exec(get(query, 'params', ''));
    if (matchForSize) {
        return matchForSize.length > 1 ? matchForSize[1] : 30;
    }
    return 30;
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
        authorId: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        categoryUri: 'text',
        versionUri: 'text',
        params: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
