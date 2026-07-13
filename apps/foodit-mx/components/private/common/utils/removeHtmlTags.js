const removeHtmlTags = (string = '') => {
    const HTML_TAG_REGEX = /<[^>]*>/gm;

    return string.replace(HTML_TAG_REGEX, '');
};

export default removeHtmlTags;
