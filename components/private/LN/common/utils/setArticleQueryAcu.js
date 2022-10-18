const setArticleQueryAcu = (nodeType, accumulated = {}) => {
    const { id, name, canonicalUrl = '' } = accumulated;

    const options = {
        author: () => ({ authorId: id }),
        distributor: () => ({ distributorId: name }),
        section: () => ({ sectionId: id }),
        tags: () => ({
            tagId: canonicalUrl
                .split('/')
                .filter(Boolean)
                .pop()
        })
    };

    return (options[nodeType] && options[nodeType]()) || {};
};

export default setArticleQueryAcu;
