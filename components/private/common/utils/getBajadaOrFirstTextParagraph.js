import getFirstParagraph from './getFirstParagraph';

const truncate = (maxChar, text = '') =>
    text.length > maxChar ? `${text.substr(0, maxChar - 1)}...` : text;

const getBajadaOrFirstTextParagraph = (
    data,
    { truncateResult = true } = {}
) => {
    const { content_elements: contentElements = [], subheadlines = {} } =
        data || {};

    if (subheadlines.basic) return subheadlines.basic;

    const firstParagraph = getFirstParagraph(contentElements) || '';
    return truncateResult ? truncate(160, firstParagraph) : firstParagraph;
};

export default getBajadaOrFirstTextParagraph;
