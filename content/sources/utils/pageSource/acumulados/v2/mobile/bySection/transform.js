import transformAcu from '../../../common/transform';
import getArticlesAcumulados from '../../../common/getArticlesAcumulados';

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

        // Add property Order to elements
        // let indiceElements = -1;
        // elementsPageHome = elementsPageHome.map((e, i) => {
        //     if (e && e.type !== 1) {
        //         if (!get(e, 'information.idRenderParent', null)) {
        //             indiceElements += 1;
        //         }

        //         return { ...e, originPosition: indiceElements };
        //     }
        //     return { ...e };
        // });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v1/mobile/bySection/transform :  query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
