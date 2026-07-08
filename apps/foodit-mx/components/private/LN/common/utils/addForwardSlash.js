import {
    escapedStringForRegex,
    isValidString
} from '../../../common/utils/dataValidation';

export const addForwardSlash = input => {
    if (!isValidString(input) || input.trim() === '') return '';

    const trimmedInput = input.trim();
    return trimmedInput.endsWith('/') ? trimmedInput : `${trimmedInput}/`;
};

export const addForwardSlashInParagraphsLinks = content => {
    if (typeof content !== 'string') return null;
    let newContent = content;
    const regLN = /<a href="(\S*?lanacion.com.ar\S*?)(?<!\/)"/g;
    const links = content.match(regLN) || [];
    const newArrayLinks = [...new Set(links)];

    newArrayLinks.forEach(etiquetaA => {
        const link = etiquetaA?.replace(regLN, '$1');
        const re = new RegExp(`"${escapedStringForRegex(link)}"`, 'g');
        newContent = newContent.replace(re, `"${addForwardSlash(link)}"`);
    });
    return newContent;
};

export const addForwardSlashInInterstitialLink = url => {
    if (typeof url !== 'string') return null;
    const lanacionUrl = /https:\/\/(.*?lanacion.com.ar.*?)/g;
    if (url.match(lanacionUrl)) {
        const link = url.replace(lanacionUrl, '$1');
        return url.replace(link, addForwardSlash(link));
    }
    return url;
};
