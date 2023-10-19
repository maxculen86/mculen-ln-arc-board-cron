import transformAcu from '../../../common/transform';
import getArticlesAcumulados from '../../../common/getArticlesAcumulados';

const getAcumulado = async queryParams => {
    const {
        uri,
        configuration,
        categoryUri,
        versionUri,
        tagSourceResult
    } = queryParams;

    const respAcumulados = await getArticlesAcumulados(queryParams);

    const tag = {
        slug: tagSourceResult.Payload.items[0].slug,
        text: tagSourceResult.Payload.items[0].name
    };

    const title = tagSourceResult.Payload.items[0].name;

    return transformAcu(respAcumulados, {
        uri,
        title,
        configuration,
        categoryUri,
        versionUri,
        tag
    });
};

const transform = async query => {
    try {
        return (await getAcumulado(query)) || [];
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v2/mobile/byTags/transform :  query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
