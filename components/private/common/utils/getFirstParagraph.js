const getFirstParagraph = contentElements => {
    if (!contentElements) return null;
    return contentElements.some(
        contentElement => contentElement.type === 'text'
    )
        ? contentElements
              .find(contentElement => contentElement.type === 'text')
              .content.replace(/<\/?[^>]+(>|$)/g, '')
        : null;
};

export default getFirstParagraph;
