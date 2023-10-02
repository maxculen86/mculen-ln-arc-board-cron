import transformAcu from './transform';
import getArticlesAcumulados from './getArticlesAcumulados';

const getAcumulado = async queryParams => {
    const { uri, title, configuration, categoryUri, versionUri } = queryParams;

    const respAcumulados = await getArticlesAcumulados(queryParams);

    return transformAcu(respAcumulados, {
        uri,
        title,
        configuration,
        categoryUri,
        versionUri
    });
};

const transform = async query => {
    try {
        return Promise.resolve(getAcumulado(query)) || [];
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
