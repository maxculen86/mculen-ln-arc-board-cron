const setArticleClassName = ({
    classCondition = '',
    withMedia,
    isRenderAuthor,
    isRenderAuthorOpinion
}) => {
    const noMediaClass = !withMedia ? '--no-media' : '';
    const authorClass =
        (isRenderAuthor && classCondition !== '--columnista') ||
        isRenderAuthorOpinion
            ? '--author'
            : '';

    return ['mod-article', classCondition, noMediaClass, authorClass]
        .filter(Boolean)
        .join(' ');
};

export default setArticleClassName;
