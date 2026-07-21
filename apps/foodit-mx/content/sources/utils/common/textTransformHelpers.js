export const setOtherChar = (text = '') =>
    typeof text === 'string'
        ? text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        : '';

export const createReplaceClassForMark =
    (colors = 'yellow|pink|purple|orange|green|gold') =>
    (text = '') =>
        (typeof text === 'string' ? text : '').replace(
            new RegExp(`hl_(${colors})`, 'g'),
            'hl_underline'
        );

export const setBoldText = ({ content, withSponsoredLink } = {}) => ({
    text:
        typeof content === 'string'
            ? content.replace(/(?:<|<(\/))b(?:>)/g, '<$1strong>')
            : '',
    withSponsoredLink
});

export const setItalicText = ({ text, withSponsoredLink } = {}) => ({
    content:
        typeof text === 'string'
            ? text.replace(/(?:<|<(\/))i(?:>)/g, '<$1em>')
            : '',
    withSponsoredLink
});

export const deleteTagsForTitle = text =>
    typeof text === 'string' ? text.replace(/(<|<\/)(em|strong)>/g, '') : '';
