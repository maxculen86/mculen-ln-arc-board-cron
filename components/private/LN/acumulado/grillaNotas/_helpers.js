/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/prefer-default-export */
import useGetArticlesFromAcumSource from '../../common/hooks/useGetArticlesFromAcumSource';

export const getArticles = ({
    props,
    imageConfig,
    promoItemsOnly = false,
    filter
}) => {
    const {
        website,
        sectionId,
        sectionsIds,
        sourceOrigin,
        tagId,
        authorId,
        distributorId,
        size = 30,
        globalContent: { type },
        excludeSectionId
    } = props;

    if (!sectionId && !tagId && !authorId && !distributorId && !sectionsIds)
        return {
            articles: []
        };

    const searchArgs = {
        typesOfQuery: {
            sectionId: excludeSectionId ? null : sectionId,
            authorId,
            tagId,
            distributorId,
            sectionsIds
        },
        filter,
        imageConfig,
        size: size.tripleSize || size,
        sourceOrigin,
        excludeSectionId,
        type,
        shouldNotFilter: false,
        website,
        promoItemsOnly,
        staticMode: false
    };

    const articles = useGetArticlesFromAcumSource(...Object.values(searchArgs));

    return {
        articles: articles.slice(0, size.tripleSize)
    };
};
