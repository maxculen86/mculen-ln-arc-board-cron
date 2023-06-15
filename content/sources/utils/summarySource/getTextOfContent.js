const getTextOfContent = (contentElements = []) => {
    const contentFiltered =
        contentElements &&
        contentElements.filter(
            contentElement =>
                contentElement.content && contentElement.type === 'text'
        );

    return contentFiltered
        .map(content => content.content)
        .join(' ')
        .replace(/<[^>]+>/g, '');
};

export default getTextOfContent;
