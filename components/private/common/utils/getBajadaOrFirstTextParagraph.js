import getFirstParagraph from './getFirstParagraph';

const truncate = (text = '', maxChar) => {
    return text.length > maxChar ? `${text.substr(0, maxChar - 1)}...` : text;
};

const getBajadaOrFirstTextParagraph = data => {
    const { content_elements: contentElements = [], subheadlines = {} } =
        data || {};
    const firstParagraph = getFirstParagraph(contentElements) || '';

    return subheadlines.basic || truncate(firstParagraph, 160);
};

export default getBajadaOrFirstTextParagraph;
