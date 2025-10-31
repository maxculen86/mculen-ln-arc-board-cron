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
        isTagWithoutWiki && requestUri.includes('/tema/');
    const isDolarHoy =
        requestUri.includes('/dolar-hoy/') && nodeType === 'section';

    return (
        (isBefore &&
            ((isNodeTypeValid && notHaveArticlesInCollection) ||
                isTagWithoutWiki)) ||
        ((isAperturaAcuTemasWithoutWiki || isDolarHoy) &&
            [0].includes(articleIndex) &&
            !hasCollectionApertura &&
            notHaveArticlesInCollection)
    );
};

export default checkIsApertura;
