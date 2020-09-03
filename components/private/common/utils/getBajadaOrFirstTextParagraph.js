const truncate = (text = '', maxChar) => {
    return text.length > maxChar ? `${text.substr(0, maxChar - 1)}...` : text;
};

const getBajadaOrFirstTextParagraph = data => {
    // eslint-disable-next-line camelcase
    const { content_elements = [], subheadlines = {} } = data;
    const firstContentElementText = content_elements.find(
        elem => elem.type === 'text'
    );
    const firstParagraph =
        firstContentElementText && firstContentElementText.content;

    return subheadlines.basic || truncate(firstParagraph, 160);
};

export default getBajadaOrFirstTextParagraph;
