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

const getAcubyFeature = async (pageSections, featureInPage, params) => {
    let sections = [];
    if (pageSections) {
        const sectionAcu = pageSections
            .map((v, i) => ({ v, i }))
            .find(
                t => get(t.v, 'information.nameFeature', null) === featureInPage
            );
        if (sectionAcu && sectionAcu.v) {
            sections = get(sectionAcu.v, 'information.sections', []);
        }
    }
    return (
        Promise.resolve(
            getSectionFromFeatureOfAcu({
                sections,
                ...params
            })
        ) || []
    );
};

const transform = async (data, query) => {
    const respData = data;
    try {
        const { featureInPage, isPage } = query;
        let pageSections = null;
        if (respData) {
            pageSections = getPageElements(respData);
        }

        if (!isPage) {
            return await getAcubyFeature(pageSections, featureInPage, query);
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
