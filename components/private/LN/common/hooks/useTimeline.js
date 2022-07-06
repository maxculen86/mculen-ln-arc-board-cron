import useGetArticlesFromAcumSource from './useGetArticlesFromAcumSource';
import sectionsFormated from '../../../common/utils/sectionsFormated';
import {
    setTLQuantity,
    setTLArticles,
    setTypeOfQuery
} from '../utils/timeline';

const useTimeline = ({
    sections,
    filter,
    size,
    arcSite,
    source,
    sectionTagType,
    sectionTagValue
}) => {
    const sectionsIds = sectionsFormated(sections);
    const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(size);

    const typesOfQuery = setTypeOfQuery({
        source,
        sectionTagType,
        sectionTagValue,
        sectionsIds
    });

    const searchArgs = {
        typesOfQuery,
        filter,
        imageConfig: 'm',
        size: articlesQuantityBackup,
        sourceOrigin: 'composer',
        excludeSectionId: false,
        type: '',
        shouldNotFilter: false,
        website: arcSite,
        promoItemsOnly: false,
        staticMode: false
    };

    const response = useGetArticlesFromAcumSource(...Object.values(searchArgs));
    const justCommonArticles = response
        .filter(
            article =>
                article.content_restrictions &&
                article.content_restrictions.content_code !== 'cerrada'
        )
        .slice(0, articlesQuantity);

    return setTLArticles(justCommonArticles);
};

export default useTimeline;
