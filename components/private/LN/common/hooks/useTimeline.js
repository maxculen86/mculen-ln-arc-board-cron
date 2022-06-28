import useGetArticlesFromAcumSource from './useGetArticlesFromAcumSource';

const useTimeline = ({
    sectionsIds,
    filter,
    articlesQuantity,
    articlesQuantityBackup = 0,
    arcSite
}) => {
    const searchArgs = {
        typesOfQuery: { sectionsIds },
        filter,
        imageConfig: 'm',
        size: articlesQuantityBackup,
        sourceOrigin: 'composer',
        excludeSectionId: false,
        type: '',
        shouldNotFilter: false,
        website: arcSite
    };

    const response = useGetArticlesFromAcumSource(...Object.values(searchArgs));
    const justCommonArticles = response
        .filter(
            article =>
                article.content_restrictions &&
                article.content_restrictions.content_code !== 'cerrada'
        )
        .slice(0, articlesQuantity);

    return justCommonArticles;
};

export default useTimeline;
