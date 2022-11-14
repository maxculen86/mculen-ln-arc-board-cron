const checkIsApertura = (
    nodeType,
    articleIndex,
    articlesInCollection,
    isWiki
) => {
    const isAuthor = nodeType === 'author';
    const isTag = nodeType === 'tags';
    const isFirstArticle = articleIndex === 0;

    return (
        (!articlesInCollection.length &&
            isFirstArticle &&
            !isAuthor &&
            !isTag) ||
        (isTag && !isWiki)
    );
};

export default checkIsApertura;
