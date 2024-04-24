import addGalleryData from './cachedCalls/addGalleryData';
import {
    addForwardSlashInInterstitialLink,
    addForwardSlashInParagraphsLinks
} from '../../../../components/private/LN/common/utils/addForwardSlash';
import convertVideoArcToJw from './cachedCalls/convertVideoArcToJW';
import addFollowAnotherNoteData from './cachedCalls/addFollowAnotherNoteData';
import get from '../../../../components/private/common/utils/get';

export const configPromoItems = {
    video: ({ cachedCall, element, arcSite }) =>
        convertVideoArcToJw(element, arcSite, cachedCall),
    gallery: ({ cachedCall, element, arcSite }) =>
        addGalleryData(cachedCall, element, arcSite)
};

export const configCallbackContentElements = {
    gallery: ({ cachedCall, element, arcSite } = {}) => {
        return addGalleryData(cachedCall, element, arcSite);
    },
    text: ({ element = {} } = {}) => {
        return formatElementText(element);
    },
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
    }
};

const callbacksByTypeReference = {
    story: ({ cachedCall, element, arcSite } = {}) => {
        return addFollowAnotherNoteData(cachedCall, element, arcSite);
    }
};

export const configCallbacksRelatedContent = {
    reference: ({ cachedCall, element, arcSite } = {}) => {
        const selectedCallback =
            callbacksByTypeReference[get(element, 'referent.type', '')];

        if (selectedCallback) {
            return selectedCallback({ cachedCall, element, arcSite });
        }

        return element;
    }
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

export const formatInterstitialLink = (interstitialLink = '') => {
    const formatUrl = addForwardSlashInInterstitialLink(
        addHttpsInterstitialLink(interstitialLink)
    );

    return removeErrosInterstitialLink(formatUrl);
};
