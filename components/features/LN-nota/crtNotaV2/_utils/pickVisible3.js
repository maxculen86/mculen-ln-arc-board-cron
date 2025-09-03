import get from '../../../../private/common/utils/get';

const getArticleId = article => get(article, '_id');

const isFirstOccurrence = (arr, id, i) =>
    arr.findIndex(x => getArticleId(x) === id) === i;

export const pickVisible3 = (
    currentId,
    mostReadArticles = [],
    alreadySeenPaths = []
) => {
    const notCurrentArticlesCollection = mostReadArticles.filter(article => {
        const articleId = getArticleId(article);
        return articleId !== currentId;
    });
    const seenArticlesSet = new Set(alreadySeenPaths);
    const baseArticlesCollections =
        notCurrentArticlesCollection.filter(
            a =>
                !seenArticlesSet.has(
                    new URL(a?.canonical_url || a?.website_url, 'https://ln')
                        .pathname
                )
        ) || [];

    const isCurrentInTop3 = (mostReadArticles.slice(0, 3) || []).some(
        article => {
            const articleId = getArticleId(article);
            return articleId === currentId;
        }
    );
    if (isCurrentInTop3) {
        const top4NoCurrent = mostReadArticles.slice(0, 4).filter(article => {
            const articleId = getArticleId(article);
            return articleId && articleId !== currentId;
        });
        const mergedArticlesCollections = [
            ...top4NoCurrent,
            ...baseArticlesCollections
        ].filter((a, i, arr) => {
            const articleId = getArticleId(a);
            return articleId && isFirstOccurrence(arr, articleId, i);
        });
        return mergedArticlesCollections.slice(0, 3);
    }

    return baseArticlesCollections.slice(0, 3);
};
