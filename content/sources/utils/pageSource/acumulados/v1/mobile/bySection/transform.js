import get from '../../../../../../../../components/private/common/utils/get';
import transformAcu from '../../../common/transform';
import getArticlesAcumulados from '../../../common/getArticlesAcumulados';
import getFieldInBox from '../../../../common/transform/getFieldsBox';

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

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;

    const { featureInPage } = query;

    try {
        const sections = getFieldInBox(
            elementsPage,
            featureInPage,
            'information.nameFeature',
            'information.sections'
        );

        const params = {
            sections,
            ...query
        };
        return (
            Promise.resolve(
                getAcumulado({
                    sections,
                    ...params
                })
            ) || []
        );

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
            `Error Transform - v1/mobile/bySection/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
