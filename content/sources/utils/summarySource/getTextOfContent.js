const getTextOfContent = (contentElements = []) => {
    const contentFiltered =
        contentElements &&
        contentElements.filter(a => a.content && a.type === 'text');

    return contentFiltered
        .map(content => content.content)
        .join(' ')
        .replace(/<[^>]+>/g, '');
};

export default getTextOfContent;
