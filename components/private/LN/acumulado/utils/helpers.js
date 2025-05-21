import { linkDictionary } from '../../../../../content/sources/utils/dolarSource/constants';
export const shouldLoadEager = (requestUri = '', index) =>
    Object.values(linkDictionary).some(link => requestUri.includes(link)) &&
    (index === 1 || index === 2);
export const shouldHideSubheaderText = requestUri => {
    const shouldBeHiddenIn = ['/avisos/funebres/'];
    return Boolean(
        shouldBeHiddenIn.some(path => (requestUri ?? '').includes(path))
    );
};
