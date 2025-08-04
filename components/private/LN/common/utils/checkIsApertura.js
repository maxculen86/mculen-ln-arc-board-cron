const checkIsApertura = ({
    hasCollectionApertura = false,
    hasChainBeforeGrid = false,
    nodeType = '',
    articleIndex = null,
    articlesInCollection = [],
    isWiki = false,
    requestUri = ''
}) => {
    const isBefore =
        articleIndex === 0 && !hasChainBeforeGrid && !hasCollectionApertura;
    const isTagWithoutWiki = nodeType === 'tags' && !isWiki;
    const isNodeTypeValid = nodeType !== 'author' && nodeType !== 'tags';
    const notHaveArticlesInCollection = !articlesInCollection.length;
    const isAperturaAcuTemasWithoutWiki =
        isTagWithoutWiki &&
        [0, 1, 2].includes(articleIndex) &&
        (requestUri.includes('/dolar-hoy/') || requestUri.includes('/tema/'));

    return (
        (isBefore &&
            ((isNodeTypeValid && notHaveArticlesInCollection) ||
                isTagWithoutWiki)) ||
        isAperturaAcuTemasWithoutWiki
    );
};

export default checkIsApertura;
