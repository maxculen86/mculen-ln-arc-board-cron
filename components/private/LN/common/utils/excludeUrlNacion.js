const excludeUrlNacion = ({
    hasCollectionApertura = false,
    hasChainBeforeGrid = false,
    nodeType = '',
    isWiki = false
}) => {
    return (
        hasCollectionApertura ||
        hasChainBeforeGrid ||
        nodeType === 'author' ||
        (nodeType === 'tags' && isWiki)
    );
};

export default excludeUrlNacion;
