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
import { buildGalleryEmbedData } from './_helper';
import { compose } from '../../../../components/private/common/utils/functional';
import config from '../../../../properties/sites/la-nacion-ar';
import { appendPageReferrerParam } from '../../../../components/private/LN/common/utils/pageReferrer';
import {
    setOtherChar,
    createReplaceClassForMark,
    setBoldText,
    setItalicText,
    deleteTagsForTitle
} from '../common/textTransformHelpers';

const replaceClassForMark = createReplaceClassForMark(
    'yellow|pink|purple|orange|green|gold'
);

export const setExternalLinks = ({
    content = '',
    withSponsoredLink,
    articlePath,
    baseOrigin
} = {}) =>
    content.replace(
        /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/g,
        (_, href, string) => {
            const [, , link] = href.match(/href=(["'\\])([^"'\\]*)\1/) || [
                null,
                null,
                '#'
            ];
            const [, , title] = href.match(/title=(["'\\])+(.*?)\1/) || [
                null,
                null,
                string
            ];

            const referredLink = appendPageReferrerParam(link, {
                articlePath,
                baseOrigin
            });
            const finalLink = referredLink || link;

            const target = !href.includes(config.host) ? '_blank' : '_self';
            const isLanacionLink = link.split('.').includes('lanacion');
            const rel =
                target === '_blank' && !isLanacionLink && !withSponsoredLink
                    ? 'nofollow'
                    : undefined;

            const attrs = [
                `href="${finalLink}"`,
                `target="${target}"`,
                `title="${deleteTagsForTitle(title)}"`,
                `class="com-link break-word"`,
                'data-mrf-recirculation="n_link_parrafo"'
            ];

            if (rel) attrs.push(`rel="${rel}"`);

            return `<a ${attrs.join(' ')}>${string}</a>`;
        }
    );

export const sanitizeString = (str = '') =>
    typeof str === 'string'
        ? str?.replace(/(?![\n\r\t])[\p{Cc}\p{Cf}\p{Cs}\p{Zp}\p{Zl}]/gu, '') ||
          ''
        : str;

export const parseImageText = (image = {}) => {
    const caption = get(image, 'caption', '');
    return {
        ...image,
        caption: sanitizeString(caption),
        additional_properties: {
            ...image.additional_properties,
            iptc_source: sanitizeString(
                get(image, 'additional_properties.iptc_source', '')
            )
        },
        subtitle: sanitizeString(get(image, 'subtitle', '')),
        credits: {
            affiliation: get(image, 'credits.affiliation', []).map(element => {
                const { name = '', type = '' } = element || {};
                return {
                    ...element,
                    name: sanitizeString(name),
                    type: sanitizeString(type)
                };
            }),
            by: get(image, 'credits.by', []).map(element => {
                const { byline = '', type = '', name = '' } = element || {};
                return {
                    byline: sanitizeString(byline),
                    type: sanitizeString(type),
                    name: sanitizeString(name)
                };
            })
        }
    };
};

export const configPromoItems = {
    image: async ({ element = {} } = {}) => {
        return parseImageText(element);
    },
    video: ({ cachedCall, element, arcSite }) =>
        convertVideoArcToJw(element, arcSite, cachedCall),
    gallery: ({ cachedCall, element, arcSite }) =>
        addGalleryData(cachedCall, element, arcSite)
};

export const configCallbackCustomEmbed = {
    'gallery-embed': async ({
        cachedCall,
        element,
        arcSite,
        isFotoAl100Note
    } = {}) => {
        if (!isFotoAl100Note) return {};

        return buildGalleryEmbedData({
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
    text: ({
        element = {},
        glossary = [],
        withSponsoredLink,
        articlePath,
        baseOrigin
    } = {}) =>
        transformElementText({
            element,
            glossary,
            withSponsoredLink,
            articlePath,
            baseOrigin
        }),
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
    },
    list: ({
        element = {},
        glossary = [],
        withSponsoredLink,
        articlePath,
        baseOrigin
    } = {}) => {
        return configListWithItemText({
            element,
            glossary,
            withSponsoredLink,
            articlePath,
            baseOrigin
        });
    },
    image: ({ element = {} } = {}) => parseImageText(element)
};

const callbacksByTypeReference = {
    story: ({ cachedCall, element, arcSite } = {}) => {
        return addFollowAnotherNoteData(cachedCall, element, arcSite);
    }
};

const configListWithItemText = ({
    element,
    glossary,
    withSponsoredLink,
    articlePath,
    baseOrigin
}) => {
    if (!element) return null;

    const items = get(element, 'items', []);

    const newItems = items.map(item => {
        if (item?.type !== 'text') return item;
        return transformElementText({
            element: item,
            glossary,
            withSponsoredLink,
            articlePath,
            baseOrigin
        });
    });

    return { ...element, items: newItems };
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
            `(?:href=(["'\\\\])+((?:(?:https?|http?):\\/\\/)?((?:[a-z][a-z0-9-]*)(?:\\.(?:[a-z-0-9]-*)*[a-z0-9]+)*` +
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

export const transformElementText = ({
    element = {},
    glossary = [],
    withSponsoredLink,
    articlePath,
    baseOrigin
} = {}) => {
    const formattedElement = formatElementText(element);
    const content = get(formattedElement, 'content', '');

    const { text: contentWithGlossary, foundGlossaryWord } =
        injectGlossaryInText(content, glossary);

    const transformedContent = compose(
        replaceClassForMark,
        setOtherChar,
        setExternalLinks,
        setItalicText,
        setBoldText
    )({
        content: contentWithGlossary,
        withSponsoredLink,
        articlePath,
        baseOrigin
    });

    return {
        ...formattedElement,
        content: transformedContent,
        ...(foundGlossaryWord && { subtype: 'glossary' })
    };
};
