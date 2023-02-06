const addForwardSlash = str => {
    if (!str || typeof str !== 'string') return null;
    if (str.charCodeAt(str.length - 1) === 47) return str;
    return str.concat('/');
};

export const addForwardSlashInParagraphsLinks = content => {
    if (typeof content !== 'string') return null;
    let newContent = content;
    const regLN = /<a href="(\S*?lanacion.com.ar\S*?)(?<!\/)"/g;
    const links = content.match(regLN) || [];
    const newArrayLinks = [...new Set(links)];

    newArrayLinks.forEach(etiquetaA => {
        const link = etiquetaA.replace(regLN, '$1');
        const re = new RegExp(`"${link}"`, 'g');
        newContent = newContent.replace(re, `"${addForwardSlash(link)}"`);
    });
    return newContent;
};

export const addForwardSlashInInterstitialLink = url => {
    if (typeof url !== 'string') return null;
    const link = url.replace(/https:\/\/"(.*?lanacion.com.ar.*?)"/g, '$1');
    const newUrl = url.replace(link, addForwardSlash(link));
    return newUrl;
};

export default addForwardSlash;
