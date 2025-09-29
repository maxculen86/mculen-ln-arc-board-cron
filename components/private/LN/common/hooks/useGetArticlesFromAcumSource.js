import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import { setSource } from '../utils/setSource';

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
    excludePreload = false,
    filterNotes,
    isPage
}) {
    const { sectionId, tagId, authorId, distributorId, sectionsIds, subtype } =
        typesOfQuery || {};

    const source = setSource({
        sectionId,
        tagId,
        authorId,
        distributorId,
        sectionsIds,
        collectionId
    });

    const articleList = useContent({
        source,
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
            excludePreload,
            filterNotes,
            isPage
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
