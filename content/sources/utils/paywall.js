import Redirect from './redirect';

const addRandomParam = url => {
    const uri = new URL(url);
    uri.searchParams.append(
        'R',
        Math.random()
            .toString(16)
            .substring(2, 8)
    );
    return uri.toString();
};

const checkPaywall = ({ queryData, urlBase, responseData }) => {
    const { paywallEnabled, meteringVariant, paywallUrl, url } = queryData;
    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        meteringVariant === 'D' &&
        paywallUrl &&
        (!responseData.content_restrictions ||
            responseData.content_restrictions.content_code !== 'abierta')
    ) {
        console.log(query);
        const callback = Buffer.from(
            addRandomParam(`${urlBase}${url}`)
        ).toString('base64');
        const finalUrl = paywallUrl.replace('{{callback}}', callback);
        throw new Redirect(finalUrl, 302);
    }
};

export default { checkPaywall };
