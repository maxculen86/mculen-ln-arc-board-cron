export const shouldLoadEager = (index, isWiki = false, requestUri = '') => {
    const matchesTargetPath =
        requestUri.includes('/dolar-hoy/') || requestUri.includes('/tema/');

    return matchesTargetPath && !isWiki && (index === 1 || index === 2);
};

export const shouldHideSubheaderText = requestUri => {
    const shouldBeHiddenIn = ['/avisos/funebres/'];
    return Boolean(
        shouldBeHiddenIn.some(path => (requestUri ?? '').includes(path))
    );
};
