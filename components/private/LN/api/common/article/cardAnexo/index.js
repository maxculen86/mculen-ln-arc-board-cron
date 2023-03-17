import get from '../../../../../common/utils/get';

export const cardAnexoItem = article => {
    const html = get(article[0], 'html', '');
    if (!html) return null;

    return [{ html }];
};

export const cardAnexoItemMobile = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);
    if (url && alto) {
        return [{ url, alto }];
    }
    return null;
};

export const cardAnexoHtmlOrUrl = article => {
    const byUrl = cardAnexoItemMobile(article);
    if (!byUrl) return cardAnexoItem(article);

    return byUrl;
};

export const cardAnexoSrc = article => {
    const url = get(article[0], 'url', null);
    const html = get(article[0], 'html', null);
    return [{ src: url || html }];
};
