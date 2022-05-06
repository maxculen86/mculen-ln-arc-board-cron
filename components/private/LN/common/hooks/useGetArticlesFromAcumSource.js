import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';

export default function useGetArticlesFromAcumSource(
    typesOfQuery,
    filter,
    imageConfig,
    size,
    sourceOrigin,
    excludeSectionId,
    type,
    shouldNotFilter,
    website = 'la-nacion-ar',
    promoItemsOnly = false,
    staticMode = true
) {
    const { sectionId, tagId, authorId, distributorId, sectionsIds, subtype } =
        typesOfQuery || {};

    const articleList = useContent({
        source:
            sectionId || tagId || authorId || distributorId || sectionsIds
                ? 'acuArticlesSource'
                : null,
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
        staticMode
    });
    return get(articleList, 'content_elements', []);
}
