import getPageElements from '../../../../../components/private/LN/api/global/page';
import get from '../../../../../components/private/common/utils/get';
import transformAcu from './apiPageAcumuladosSource/transform';
import getArticlesAcumulados from './apiPageAcumuladosSource/getArticlesAcumulados';

const getSectionFromFeatureOfAcu = async queryParams => {
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

const setInfoFeatureInPage = async (pageSections, featureInPage, params) => {
    const previewSections = pageSections;

    const listSectionAcu = pageSections
        .map((v, i) => ({ v, i }))
        .filter(
            t => get(t.v, 'information.nameFeature', null) === featureInPage
        );

    const resp = await Promise.all(
        listSectionAcu?.map(async t => {
            const sections = get(
                previewSections[t.i].information,
                'sections',
                []
            );

            previewSections[t.i].information = {
                ...previewSections[t.i].information,
                additional_properties: {
                    sections,
                    ...params
                }
            };
            if (
                sections &&
                sections.length > 0 &&
                previewSections[t.i].information &&
                previewSections[t.i].information.additional_properties
            ) {
                delete previewSections[t.i].information.sections;
                previewSections[t.i].sectionAccumulated =
                    (await getSectionFromFeatureOfAcu(
                        previewSections[t.i].information.additional_properties
                    )) || [];
            }
            return previewSections[t.i];
        })
    );

    await Promise.all(
        resp.map(r => {
            return r;
        })
    );
    return previewSections;
};

const transform = async (data, query) => {
    const respData = data;
    try {
        const { featureInPage } = query;

        let pageSections = getPageElements(respData);

        if (featureInPage) {
            pageSections = await setInfoFeatureInPage(
                pageSections,
                featureInPage,
                query
            );
        }
        return pageSections;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/apiPageSource :  siteprops: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
