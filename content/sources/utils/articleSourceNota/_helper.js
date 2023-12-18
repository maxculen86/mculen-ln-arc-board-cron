import get from '../../../../components/private/common/utils/get';
import {
    addForwardSlashInParagraphsLinks,
    addForwardSlashInInterstitialLink
} from '../../../../components/private/LN/common/utils/addForwardSlash';
import Redirect from '../redirect';
import validateExclusiveAccess from '../validateExclusiveAccess';
import isNotShowcase from '../isNotShowcase';
import paywallUtils from '../paywall';

// Tener en cuenta que foodit usa estos helpers

export const getUrlQuery = key => {
    const { url, id, published } = key || {};
    const arcSite = key ? key['arc-site'] : 'la-nacion-ar';

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
        const regexUrl = /^\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(byUrl(\/.+\/$)|byId\/(.+)\/$)/;
        const groups = regexUrl.exec(url);
        if (groups) urlClear = groups[3];
        return `${basePath}&website_url=${urlClear}`;
    }

    throw new Error('Debe definir url o id para obtener la nota');
};

export const setRedirect = ({ response, query, siteUrl }) => {
    const typeResponse = get(response, 'type', '');
    const redirectUrl = get(response, 'redirect_url', '');
    const paywallEnabled = get(query, 'paywallEnabled', '');

    if (typeResponse === 'redirect' && redirectUrl) {
        throw new Redirect(redirectUrl, 301);
    }

    const forwardUrl = get(
        response,
        'related_content.redirect[0].redirect_url'
    );

    const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (forwardUrl && regExp.test(forwardUrl)) {
        throw new Redirect(forwardUrl, 301);
    }

    if (
        (paywallEnabled === '1' || paywallEnabled === 'true') &&
        get(query, 'checkExclusiveAccess')
    ) {
        validateExclusiveAccess({
            contentCode: get(response, 'content_restrictions.content_code', ''),
            meteringVariant: get(query, 'meteringVariant', ''),
            host: siteUrl,
            path: query.uri
        });
    }

    isNotShowcase(response) &&
        paywallUtils.checkPaywall({
            queryData: query,
            urlBase: siteUrl,
            responseData: response
        });
};

export const transformPromoItems = async ({
    cachedCall,
    arcSite,
    configCallbacks,
    promoItemObject = {}
}) => {
    const promiseArr = [];

    for (let property in promoItemObject) {
        const callabckSelected =
            configCallbacks[get(promoItemObject, `${property}.type`, '')];

        if (callabckSelected) {
            promiseArr.push(
                callabckSelected({
                    element: promoItemObject[property],
                    cachedCall,
                    arcSite
                }).then(newValue => ({ [property]: newValue }))
            );
        }
    }

    const results = await Promise.all(promiseArr);

    return Object.assign({ ...promoItemObject }, ...results);
};

export const addHttpsInterstitialLink = url => {
    if (typeof url === 'string') {
        return url.replace(/^(http):\/\/|^\/\//, 'https://');
    }
    return url;
};

export const addHttpsLinkInParagraphs = content => {
    if (typeof content === 'string') {
        return content.replace(
            /href="(http):\/\/|href="\/\//g,
            'href="https://'
        );
    }
    return content;
};

export const getMalformedAnchorTags = (textContent = '') => {
    const linkList =
        textContent.match(
            // Este regex busca dentro del texto elementos HTML: <a/>
            new RegExp(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/, 'gim')
        ) || [];

    return linkList.filter(e => {
        return !new RegExp(
            // Este regex es un formato de URL valido. Aca lo que se hace es validar que la url que venga en el href del tag A sea valido.
            `(?:href=(["'\\\\])+((?:(?:https?|http?):\\/\\/)?((?:[a-z]+)(?:\\.(?:[a-z-0-9]-*)*[a-z-0-9]+)*` +
                `(?:\\.(?:[a-z]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?||\\/[a-z-0-9\\S]+)\\1)`,
            'gim'
        ).test(e);
    });
};

export const replaceMalformedAnchorTags = ({ textTypeElement, newValue }) => {
    const content = get(textTypeElement, 'content', '');
    const listErrors = getMalformedAnchorTags(content);

    return listErrors.reduce((acc, e) => {
        const { content } = acc;
        return {
            ...acc,
            content: content.replace(e, e.replace(/<[^>]*>/gim, newValue))
        };
    }, textTypeElement);
};

export const formatElementText = (elementText = {}) => {
    const content = get(elementText, 'content', '');
    const newElement = {
        ...elementText,
        content: addForwardSlashInParagraphsLinks(
            addHttpsLinkInParagraphs(content)
        )
    };

    return replaceMalformedAnchorTags({
        textTypeElement: newElement,
        newValue: ''
    });
};

export const removeErrosInterstitialLink = (url = '') => {
    const errors =
        (!new RegExp(
            // Este regex es un formato de URL valido. Si no entra aca, significa que la url no tiene errores.
            '^(http|https|:\\/\\/|\\.|@){2,}(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\S*:\\w*@)*([a-zA-Z]|(\\d{1,3}|\\.){7}){1,}' +
                '(\\w|\\.{2,}|\\.[a-zA-Z]{2,3}|\\/|\\?|&|:\\d|@|=|\\/|\\(.*\\)|#|-|%)*$',
            'gim'
        ).test(url) && [url]) ||
        [];

    if (!errors.length) {
        return url;
    }

    return '';
};

export const formatInterstitialLink = (interstitialLink = '') => {
    const formatUrl = addForwardSlashInInterstitialLink(
        addHttpsInterstitialLink(interstitialLink)
    );

    return removeErrosInterstitialLink(formatUrl);
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

export const transformAuthors = (authorList = []) => {
    return authorList.map(author => {
        return {
            ...author,
            additional_properties: {
                ...get(author, 'additional_properties', {}),
                original: {
                    ...get(author, 'additional_properties.original', {}),
                    image: get(author, 'image.resized_urls[0].resizedUrl', '')
                }
            }
        };
    });
};

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

                    newElement && acc.push(newElement);
                }
            } catch (err) {
                console.error('Ocurrio un error en el elemento', element);
            }

            return acc;
        }, []);
    }

    return [];
};
