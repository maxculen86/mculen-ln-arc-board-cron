const getMetaDescription = (
    description,
    firstParagraphContentElements,
    metaTitleBasic
) => {
    if (description && description !== '') return description;
    if (firstParagraphContentElements && firstParagraphContentElements !== '')
        return firstParagraphContentElements;
    return metaTitleBasic;
};

export default getMetaDescription;
