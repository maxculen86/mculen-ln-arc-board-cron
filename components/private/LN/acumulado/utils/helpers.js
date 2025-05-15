import { linkDictionary } from '../../../../../content/sources/utils/dolarSource/constants';
export const shouldLoadEager = (requestUri = '', index) =>
    Object.values(linkDictionary).some(link => requestUri.includes(link)) &&
    (index === 1 || index === 2);
