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
    staticMode = true,
    collectionId = ''
) {
    const { sectionId, tagId, authorId, distributorId, sectionsIds, subtype } =
        typesOfQuery || {};

    const setSource = () => {
        if (sectionId || tagId || distributorId || sectionsIds)
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
            shouldNotFilter
        },
        filter,
        staticMode
    });

    return get(articleList, 'content_elements', []);
}
