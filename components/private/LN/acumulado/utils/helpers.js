export const shouldHideSubheaderText = requestUri => {
    const shouldBeHiddenIn = ['/avisos/funebres/'];
    return Boolean(
        shouldBeHiddenIn.some(path => (requestUri ?? '').includes(path))
    );
};
