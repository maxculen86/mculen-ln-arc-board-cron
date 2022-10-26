import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';

export default function useGetArticlesFromAcumSource({
    typesOfQuery,
    filter,
    imageConfig,
    size,
    sourceOrigin = '',
    excludeSectionId = false,
    type = '',
    shouldNotFilter = false,
    website = 'la-nacion-ar',
    promoItemsOnly = false,
    staticMode = true,
    collectionId = '',
    withPagination = false,
    page,
    hasCollectionApertura = false,
    excludePreload = false
}) {
    const { sectionId, tagId, authorId, distributorId, sectionsIds, subtype } =
        typesOfQuery || {};

    const setSource = () => {
        if (sectionId || tagId || authorId || distributorId || sectionsIds)
            return 'acuArticlesSource';

        if (collectionId) return 'collectionsSource';

        return null;
    };

    const articleList = useContent({
        source: setSource(),
        query: {
            ...(collectionId && { id: collectionId }),
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
            shouldNotFilter,
            page,
            hasCollectionApertura,
            excludePreload
        },
        filter,
        staticMode
    });

    const contentElements = get(articleList, 'content_elements', []);

    return withPagination
        ? {
              articles: contentElements,
              moreArticles: get(articleList, 'next', 0)
          }
        : contentElements;
}
