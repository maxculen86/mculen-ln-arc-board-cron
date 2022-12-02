const checkIsApertura = ({
    hasCollectionApertura = false,
    hasChainBeforeGrid = false,
    nodeType = '',
    articleIndex = null,
    articlesInCollection = [],
    isWiki = false
}) => {
    const isBefore =
        articleIndex === 0 && !hasChainBeforeGrid && !hasCollectionApertura;
    const isTagWithoutWiki = nodeType === 'tags' && !isWiki;
    const isNodeTypeValid = nodeType !== 'author' && nodeType !== 'tags';
    const notHaveArticlesInCollection = !articlesInCollection.length;
    return (
        isBefore &&
        ((isNodeTypeValid && notHaveArticlesInCollection) || isTagWithoutWiki)
    );
};

export default checkIsApertura;
