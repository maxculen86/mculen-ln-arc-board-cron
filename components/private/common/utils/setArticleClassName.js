const setArticleClassName = ({
    classCondition = '',
    withMedia,
    hasAuthorName
}) => {
    const noMediaClass = !withMedia ? '--no-media' : '';
    const authorClass = hasAuthorName ? '--author' : '';

    return ['mod-article', classCondition, noMediaClass, authorClass]
        .filter(Boolean)
        .join(' ');
};

export default setArticleClassName;
