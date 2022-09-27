const checkIsApertura = (nodeType, articleIndex, articlesInCollection) => {
    const isAuthor = nodeType === 'author';
    const isFirstArticle = articleIndex === 0;

    return !articlesInCollection.length && isFirstArticle && !isAuthor;
};

export default checkIsApertura;
