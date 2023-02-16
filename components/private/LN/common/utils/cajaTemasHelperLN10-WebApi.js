/* eslint-disable react-hooks/rules-of-hooks */
import get from '../../../common/utils/get';
import sectionsValidation from '../../../../layouts/config/LN10-Home.config.json';

export const getChildrenFromSectionHome = (
    renderables,
    sectionName,
    sectionPosition
) => {
    const INDEX_SECTION =
        get(sectionsValidation, `${sectionName}.position`, sectionPosition) + 1;

    return get(renderables, `[${INDEX_SECTION}].children`, []) || [];
};

export const getArticlesOfChain = ({
    isInSiteService,
    articlesFromCollectionSiteService = [],
    articlesToShow = []
}) => (isInSiteService ? articlesFromCollectionSiteService : articlesToShow);
