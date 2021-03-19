const getMetaDescription = (
    description,
    firstParagraphContentElements,
    metaTitleBasic,
    subheadlines
) => {
    if (description && description !== '') return description;
    if (subheadlines && subheadlines !== '') return subheadlines;
    if (firstParagraphContentElements && firstParagraphContentElements !== '')
        return firstParagraphContentElements;
    return metaTitleBasic;
};

export default getMetaDescription;
