const setArticleClassName = ({
    _id,
    classCondition = '',
    boxPosition,
    artPosition,
    noMedia,
    isRenderAuthor,
    isRenderAuthorOpinion
}) => {
    const toiClass = boxPosition
        ? `toi${boxPosition.replace('toi', '')}${artPosition || ''} nid${_id}`
        : '';
    const noMediaClass = noMedia ? '--no-media' : '';
    const authorClass =
        (isRenderAuthor && classCondition !== '--columnista') ||
        isRenderAuthorOpinion
            ? '--author'
            : '';

    return ['mod-article', toiClass, classCondition, noMediaClass, authorClass]
        .filter(Boolean)
        .join(' ');
};

export default setArticleClassName;
