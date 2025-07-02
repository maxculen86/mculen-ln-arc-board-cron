export const shouldLoadEager = (
    index,
    isWiki = false,
    requestUri = '',
    isApertura = false
) => {
    const matchesTargetPath =
        requestUri.includes('/dolar-hoy/') || requestUri.includes('/tema/');

    return (
        matchesTargetPath &&
        !isWiki &&
        (index === 1 || index === 2) &&
        !isApertura
    );
};

export const shouldHideSubheaderText = requestUri => {
    const shouldBeHiddenIn = ['/avisos/funebres/'];
    return Boolean(
        shouldBeHiddenIn.some(path => (requestUri ?? '').includes(path))
    );
};
