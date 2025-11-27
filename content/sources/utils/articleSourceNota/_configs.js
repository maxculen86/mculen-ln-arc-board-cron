/* eslint-disable */
import addGalleryData from './cachedCalls/addGalleryData';
import {
    addForwardSlashInInterstitialLink,
    addForwardSlashInParagraphsLinks
} from '../../../../components/private/LN/common/utils/addForwardSlash';
import convertVideoArcToJw from './cachedCalls/convertVideoArcToJW';
import addFollowAnotherNoteData from './cachedCalls/addFollowAnotherNoteData';
import get from '../../../../components/private/common/utils/get';
import gallerySource from '../../gallerySource';
import { buildGalleryEmbedData } from '../../../../components/features/LN-nota/private/body/imageGalleryEmbed/_helper';

export const configPromoItems = {
    video: ({ cachedCall, element, arcSite }) =>
        convertVideoArcToJw(element, arcSite, cachedCall),
    gallery: ({ cachedCall, element, arcSite }) =>
        addGalleryData(cachedCall, element, arcSite)
};

const configCallbackCustomEmbed = {
    'gallery-embed': async ({
        cachedCall,
        element,
        arcSite,
        isFotoAl100Note
    } = {}) => {
        if (!isFotoAl100Note) return {};

        return await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite
        });
    }
};

export const configCallbackContentElements = {
    gallery: ({ cachedCall, element, arcSite } = {}) => {
        return addGalleryData(cachedCall, element, arcSite);
    },
    custom_embed: async ({
        cachedCall,
        element,
        arcSite,
        isFotoAl100Note
    } = {}) => {
        const selectedCallback =
            configCallbackCustomEmbed[get(element, 'subtype', '')];
        if (selectedCallback) {
            return selectedCallback({
                cachedCall,
                element,
                arcSite,
                isFotoAl100Note
            });
        }
        return element;
    },
    text: ({ element = {}, glossary = [] } = {}) => {
        const elements = formatElementText(element);
        const content = get(elements, 'content', '');

        const { text, foundGlossaryWord } = injectGlossaryInText(
            content,
            glossary
        );

        return {
            ...elements,
            content: text,
            ...(foundGlossaryWord && { subtype: 'glossary' })
        };
    },
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
    },
    list: ({ element = {}, glossary = [] }) => {
        return configListWithItemText(element, glossary);
    }
};

const callbacksByTypeReference = {
    story: ({ cachedCall, element, arcSite } = {}) => {
        return addFollowAnotherNoteData(cachedCall, element, arcSite);
    }
};

const configListWithItemText = (element, glossary) => {
    if (!element) return null;

    const items = get(element, 'items', []);

    items.map(item => {
        if (item.type === 'text') {
            const { text, foundGlossaryWord } = injectGlossaryInText(
                item.content,
                glossary
            );
            item.content = text;
            foundGlossaryWord && (item.subtype = 'glossary');
        }
    });

    return element;
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
    const contentElement = get(textTypeElement, 'content', '');
    const listErrors = getMalformedAnchorTags(contentElement);

    return listErrors.reduce((acc, e = '') => {
        const { content } = acc;
        return {
            ...acc,
            content: content?.replace(e, e.replace(/<[^>]*>/gim, newValue))
        };
    }, textTypeElement);
};

export const formatInterstitialLink = (interstitialLink = '') => {
    const formatUrl = addForwardSlashInInterstitialLink(
        addHttpsInterstitialLink(interstitialLink)
    );

    return removeErrosInterstitialLink(formatUrl);
};

export const injectGlossaryInText = (text, glossary) => {
    let foundGlossaryWord = false;
    // noHighlighting se debe pasar a true si se necesita apagar el subrayado azul y el tooltip en todas las notas que contengan glosario.
    const noHighlighting = true;

    if (!(glossary && glossary.length) || noHighlighting)
        return { text, foundGlossaryWord };

    const parts = text.split(/(<a[^>]*>.*?<\/a>)/g);
    const processedParts = parts.map(part => {
        if (part.startsWith('<a')) {
            return part;
        } else {
            glossary.forEach(glossaryItem => {
                const regex = new RegExp(`\\b${glossaryItem.key}\\b`, 'gi');
                if (regex.test(part)) {
                    foundGlossaryWord = true;
                    part = part?.replace(
                        regex,
                        match =>
                            `<mark class="word-glossary" onmouseenter="if(window.LN.handleGlossary) { window.LN.handleGlossary(event,'${glossaryItem.key}') }" onmouseleave="if(window.LN.handleGlossary) { window.LN.handleGlossary(event,'${glossaryItem.key}') }">${match}</mark>`
                    );
                }
            });
            return part;
        }
    });

    return { text: processedParts.join(''), foundGlossaryWord };
};
