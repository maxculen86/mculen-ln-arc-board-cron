import { useContent } from 'fusion:content';
import sectionsFormated from '../../../common/utils/sectionsFormated';
import {
    setTLQuantity,
    setTLArticles,
    setTypeOfQuery,
    transformLastNewsContent
} from '../utils/timeline';
import { setSource } from '../utils/setSource';
import get from '../../../common/utils/get';

const useTimeline = ({
    sections,
    filter,
    size,
    arcSite,
    source,
    sectionTagType,
    sectionTagValue,
    collectionId
}) => {
    const sectionsIds = sectionsFormated(sections);
    const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(size);
    const isSSR = typeof window === 'undefined';

    const typesOfQuery = setTypeOfQuery({
        source,
        sectionTagType,
        sectionTagValue,
        sectionsIds
    });

    const tlArticlesList = useContent({
        source: setSource({ ...typesOfQuery, collectionId }),
        query: {
            ...(collectionId && { id: collectionId }),
            ...typesOfQuery,
            website: arcSite,
            imageConfig: 'm',
            size: articlesQuantityBackup,
            sourceOrigin: 'composer',
            excludeSectionId: false,
            promoItemsOnly: false,
            type: '',
            shouldNotFilter: false,
            hasCollectionApertura: false,
            excludePreload: false
        },
        filter,
        staticMode: isSSR,
        ...(source === 'byLastNews' && {
            transform(data) {
                return transformLastNewsContent(data);
            }
        })
    });

    const response = get(tlArticlesList, 'content_elements', []);

    const justCommonArticles = response
        .filter(
            article =>
                article.content_restrictions &&
                article.content_restrictions.content_code !== 'cerrada'
        )
        .slice(0, articlesQuantity);

    return setTLArticles(source, justCommonArticles);
};

export default useTimeline;
