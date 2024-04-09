import transformAcu from './transform';
import getArticlesAcumulados from './getArticlesAcumulados';

const getAcumulado = async (queryParams, { cachedCall }) => {
    const { uri, title, configuration, categoryUri, versionUri } = queryParams;

    const respAcumulados = await getArticlesAcumulados(queryParams, {
        cachedCall
    });

    return transformAcu(respAcumulados, {
        uri,
        title,
        configuration,
        categoryUri,
        versionUri
    });
};

const transform = async (query, { cachedCall }) => {
    try {
        return (await getAcumulado(query, { cachedCall })) || [];
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - sources/utils/acumulados/common/transformAcuV1 :  query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
