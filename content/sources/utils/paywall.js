import Redirect from './redirect';

export const addRandomParam = url => {
    const uri = new URL(url);
    uri.searchParams.append(
        'R',
        Math.random() // NOSONAR
            .toString(16)
            .substring(2, 8)
    );
    return uri.toString();
};

export const setCallback = (host, path) =>
    Buffer.from(addRandomParam(`${host}${path}`)).toString('base64');

const checkPaywall = ({ queryData, urlBase, responseData }) => {
    const { paywallEnabled, meteringVariant, paywallUrl, url } = queryData;
    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        meteringVariant === 'D' &&
        paywallUrl &&
        (!responseData.content_restrictions ||
            responseData.content_restrictions.content_code !== 'abierta')
    ) {
        const callback = setCallback(urlBase, url);
        const finalUrl = paywallUrl.replace('{{callback}}', callback);
        throw new Redirect(finalUrl, 302);
    }
};

export default { checkPaywall };
