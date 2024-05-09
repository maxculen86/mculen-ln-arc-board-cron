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

export const setCallback = (
    host,
    path,
    utmMedium,
    utmSource,
    utmCampaign,
    utmContent,
    utmTerm
) => {
    const urlWithParams = addRandomParam(`${host}${path}`);
    const uri = new URL(urlWithParams);

    const params = {
        utm_medium: utmMedium,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm
    };

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            uri.searchParams.append(key, value);
        }
    });

    return Buffer.from(uri.toString()).toString('base64');
};

const checkPaywall = ({ queryData, urlBase, responseData }) => {
    const {
        paywallEnabled,
        meteringVariant,
        paywallUrl,
        url,
        utm_medium,
        utm_source,
        utm_campaign,
        utm_content,
        utm_term
    } = queryData;
    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        meteringVariant === 'D' &&
        paywallUrl &&
        (!responseData.content_restrictions ||
            responseData.content_restrictions.content_code !== 'abierta')
    ) {
        const callback = setCallback(
            urlBase,
            url,
            utm_medium,
            utm_source,
            utm_campaign,
            utm_content,
            utm_term
        );
        const finalUrl = paywallUrl.replace('{{callback}}', callback);
        throw new Redirect(finalUrl, 302);
    }
};

export default { checkPaywall };
