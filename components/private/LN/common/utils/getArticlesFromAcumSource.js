import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';

const getArticlesFromAcumSource = (
    typesOfQuery,
    filter,
    imageConfig,
    size,
    sourceOrigin,
    excludeSectionId,
    type,
    website = 'la-nacion-ar',
    promoItemsOnly = false,
    shouldNotFilter
) => {
    const { sectionId, tagId, authorId, distributorId, sectionsIds, subtype } =
        typesOfQuery || {};

    if (!sectionId && !tagId && !authorId && !distributorId && !sectionsIds)
        return [];

    const articleList = useContent({
        source: 'acuArticlesSource',
        query: {
            website,
            sectionId,
            authorId,
            tagId,
            subtype,
            size: size.tripleSize || size,
            imageConfig,
            excludeSectionId,
            promoItemsOnly,
            distributorId,
            sectionsIds,
            sourceOrigin,
            type,
            shouldNotFilter
        },
        filter,
        staticMode: true
    });

    return get(articleList, 'content_elements', []);
};

export default getArticlesFromAcumSource;
