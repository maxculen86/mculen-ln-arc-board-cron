// Trim deliberado (fase 6, content-source-migration): este archivo en el monolito exporta
// también `transform`/`transformContentElements`/`getImageConfig` (flujo LN, no usado por Foodit,
// que tiene su propio `transform` en fooditSources/fooditArticleSource/index.js) y `updateUrlIfMatch`/
// `getIncludedFields` (no importados por ningún source de Foodit). Copiarlos verbatim reintroducía
// `properties/sites/la-nacion-ar.js` + `helperConfigLN/*` (el mismo leak multi-sitio que 4ot-opt.2
// ya había eliminado por otra vía) sin aportar código alcanzable desde Foodit. Se conservan solo los
// exports realmente importados: `setRedirect` (fooditArticleSource.js), `getUrlQuery`/`transformSubtype`
// (fooditBaseArticleSource.js), `transformElementsBasedOnType`/`transformPromoItems`/`transformAuthors`/
// `filterSections` (fooditSources/fooditArticleSource/index.js).
import { CLL_HTMLFREE_DOMAIN } from 'fusion:environment';
import get from '../../../../components/private/common/utils/get';
import Redirect from '../redirect';
import validateExclusiveAccess from '../validateExclusiveAccess';
import isNotShowcase from '../isNotShowcase';
import paywallUtils from '../paywall';
import {
    HTMLLIBRECLL,
    translateStringFromSubitypeToID
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';

export const getUrlQuery = key => {
    const { url, id, published } = key || {};
    const arcSite = key ? key['arc-site'] : 'foodit';

    let basePath = `/content/v4/stories/?website=${arcSite}`;
    const sourceInclude = get(key, 'sourceInclude', '');

    if (published) basePath = `${basePath}&published=${published}`;

    if (sourceInclude) {
        const uriParams = [`&included_fields=${sourceInclude}`].join('');
        basePath = `${basePath}${uriParams}`;
    }

    if (id) return `${basePath}&_id=${id}`;

    if (url) {
        let urlClear = url;
        const regexUrl =
            /^\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(byUrl(\/.+\/$)|byId\/(.+)\/$)/;
        const groups = regexUrl.exec(url);
        if (groups) urlClear = groups[3] || groups[4];
        return `${basePath}&website_url=${urlClear}`;
    }

    throw new Error('Debe definir url o id para obtener la nota');
};
const getUriAndUrl = query => {
    const uri = get(query, 'uri', '');
    const url = get(query, 'url', '');
    return { url, uri };
};

export const checkIfExternalRedirect = (typeResponse, redirectUrl, query) => {
    const { uri } = getUriAndUrl(query);
    return (
        typeResponse === 'redirect' &&
        redirectUrl &&
        uri?.startsWith('/api/mobile') &&
        redirectUrl?.startsWith('http')
    );
};

export const handleRedirectMobile = (typeResponse, redirectUrl, query) => {
    const { url, uri } = getUriAndUrl(query);

    if (
        typeResponse !== 'redirect' ||
        !redirectUrl ||
        !url ||
        !uri.startsWith('/api/mobile')
    )
        return;

    const prefixMobile = uri.slice(0, uri.indexOf(url));
    const newRedirection = `${prefixMobile}${redirectUrl}`;
    throw new Redirect(newRedirection, 301);
};
export const setRedirect = ({ response, query, siteUrl, paywallUrl }) => {
    const typeResponse = get(response, 'type', '');
    const subtype = get(response, 'subtype', '');
    const redirectUrl = get(response, 'redirect_url', '');
    const websiteUrl = get(response, 'website_url');
    const paywallEnabled = get(query, 'paywallEnabled', '');
    const isApi = get(query, 'isApi', false);
    const isExternalApiRedirect = checkIfExternalRedirect(
        typeResponse,
        redirectUrl,
        query
    );

    if (subtype === HTMLLIBRECLL && websiteUrl && !isApi) {
        throw new Redirect(`${CLL_HTMLFREE_DOMAIN}${websiteUrl}`, 301);
    }
    if (isExternalApiRedirect) return redirectUrl;

    handleRedirectMobile(typeResponse, redirectUrl, query);

    if (typeResponse === 'redirect' && redirectUrl) {
        throw new Redirect(redirectUrl, 301);
    }

    const forwardUrl = get(
        response,
        'related_content.redirect[0].redirect_url'
    );

    const regExp =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

    if (forwardUrl && regExp.test(forwardUrl)) {
        throw new Redirect(forwardUrl, 301);
    }

    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        get(query, 'checkExclusiveAccess', true)
    ) {
        validateExclusiveAccess({
            contentCode: get(response, 'content_restrictions.content_code', ''),
            meteringVariant: get(query, 'meteringVariant', ''),
            host: siteUrl,
            path: query.uri,
            paywallUrl
        });
    }

    if (isNotShowcase(response)) {
        paywallUtils.checkPaywall({
            queryData: query,
            urlBase: siteUrl,
            responseData: response
        });
    }
    return {};
};

export const isValidSectionIA = sections => {
    const section = get(sections, '[0].path', '');

    const invalidSections = ['/opinion', '/politica', '/recetas'];

    if (section) {
        return !invalidSections.some(invalidSection =>
            section.startsWith(invalidSection)
        );
    }

    return false;
};

export const transformPromoItems = async ({
    cachedCall,
    arcSite,
    configCallbacks,
    promoItemObject = {},
    sections
}) => {
    const isValidSectionForIA = isValidSectionIA(sections);
    const promoItemObjectCopy = { ...promoItemObject };

    if (!isValidSectionForIA) {
        delete promoItemObjectCopy.summary;
    }

    const promiseArr = [];

    Object.keys(promoItemObjectCopy).forEach(property => {
        const callabckSelected =
            configCallbacks[get(promoItemObjectCopy, `${property}.type`, '')];

        if (callabckSelected) {
            promiseArr.push(
                callabckSelected({
                    element: promoItemObjectCopy[property],
                    cachedCall,
                    arcSite
                }).then(newValue => ({ [property]: newValue }))
            );
        }
    });

    const results = await Promise.all(promiseArr);

    return Object.assign({ ...promoItemObjectCopy }, ...results);
};

export const filterSections = (response = {}) => {
    const taxonomy = get(response, 'taxonomy', {});
    return {
        ...taxonomy,
        sections: get(taxonomy, 'sections', []).filter(
            section => get(section, 'type', '') === 'section'
        )
    };
};

export const transformAuthors = (authorList = []) =>
    authorList.map(author => ({
        ...author,
        additional_properties: {
            ...get(author, 'additional_properties', {}),
            original: {
                ...get(author, 'additional_properties.original', {}),
                image: get(author, 'image.resized_urls[0].resizedUrl', '')
            }
        }
    }));

export const transformElementsBasedOnType = ({
    arrayElements = [],
    configCallbacks = {},
    searchPropertyOnElem = 'type',
    aditionalProps = {}
}) => {
    if (Array.isArray(arrayElements)) {
        return arrayElements.reduce((acc, element) => {
            try {
                if (element) {
                    const selectedCallback =
                        configCallbacks &&
                        configCallbacks[get(element, searchPropertyOnElem, '')];

                    const newElement = selectedCallback
                        ? selectedCallback({ ...aditionalProps, element })
                        : element;

                    if (newElement) acc.push(newElement);
                }
            } catch (err) {
                console.error('Ocurrio un error en el elemento', err, element);
            }

            return acc;
        }, []);
    }

    return [];
};

export const transformSubtype = (response = {}) => {
    const subtype = get(response, 'subtype');

    if (response) {
        return {
            ...response,
            subtype: translateStringFromSubitypeToID(subtype)
        };
    }

    return response;
};
