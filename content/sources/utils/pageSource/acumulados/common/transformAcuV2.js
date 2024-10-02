import getArticlesAcumulados from './getArticlesAcumulados';

const getAcumulado = async (queryParams, { cachedCall } = {}) => {
    const respAcumulados = await getArticlesAcumulados(queryParams, {
        cachedCall
    });

    return { ...respAcumulados, query: queryParams };
};

const transform = async (query, { cachedCall } = {}) => {
    try {
        return (await getAcumulado(query, { cachedCall })) || [];
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - sources/utils/acumulados/common/transformAcuV2 :  query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
