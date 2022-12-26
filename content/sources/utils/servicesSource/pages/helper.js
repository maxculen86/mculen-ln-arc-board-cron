import getPageElements from '../../../../../components/private/LN/api/global/page';
import get from '../../../../../components/private/common/utils/get';

export const getFeatureInPage = (data, featureInPage) => {
    const respData = data;

    const pageSections = getPageElements(respData);

    if (featureInPage) {
        return (
            pageSections &&
            pageSections.find(
                e =>
                    e.articles &&
                    e.information &&
                    get(e, 'information.nameFeature') === featureInPage
            )?.information
        );
    }
    return null;
};

export const getFeatureInPage2 = (data, query) => {
    const { featureInPage } = query;
    const respData = data;

    const pageSections = getPageElements(respData);

    if (featureInPage) {
        return (
            pageSections &&
            pageSections.find(
                e =>
                    e.articles &&
                    e.information &&
                    get(e, 'information.nameFeature') === featureInPage
            )?.information
        );
    }
    return null;
};
