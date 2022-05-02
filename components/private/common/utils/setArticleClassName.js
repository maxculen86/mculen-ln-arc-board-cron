const setArticleClassName = ({
    _id,
    classCondition = '',
    boxPosition,
    artPosition,
    withMedia,
    isRenderAuthor,
    isRenderAuthorOpinion
}) => {
    const toiClass = boxPosition
        ? `toi${boxPosition.replace('toi', '')}${artPosition || ''} nid${_id}`
        : '';
    const noMediaClass = !withMedia ? '--no-media' : '';
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
