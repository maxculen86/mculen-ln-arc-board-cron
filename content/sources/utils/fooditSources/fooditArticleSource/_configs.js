import { formatInterstitialLink } from '../../articleSourceNota/_configs';
import convertVideoArcToJw from '../../articleSourceNota/cachedCalls/convertVideoArcToJW';
import addFollowAnotherNoteData from '../../articleSourceNota/cachedCalls/addFollowAnotherNoteData';
import get from '../../../../../components/private/common/utils/get';
import { addForwardSlashInParagraphsLinks } from '../../../../../components/private/LN/common/utils/addForwardSlash';
import { compose } from '../../../../../components/private/common/utils/functional';

export const configPromoItems = {
    video: ({ element }) => convertVideoArcToJw(element, arcSite, cachedCall)
};

export const setOtherChar = (text = '') =>
    text ? text.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '';

export const replaceClassForMark = text =>
    text
        ? text.replace(/hl_(yellow|pink|purple|orange|green)/g, 'hl_underline')
        : '';

export const setBoldText = ({ content, withSponsoredLink } = {}) => ({
    text: content ? content.replace(/(?:<|<(\/))b(?:>)/g, '<$1strong>') : '',
    withSponsoredLink
});

export const setItalicText = ({ text, withSponsoredLink } = {}) => ({
    content: text ? text.replace(/(?:<|<(\/))i(?:>)/g, '<$1em>') : '',
    withSponsoredLink
});

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

export const deleteTagsForTitle = text =>
    text ? text.replace(/(<|<\/)(em|strong)>/g, '') : '';

export const addAttribute = ({ attributes, text = '' }) => {
    if (Array.isArray(attributes) && attributes.length && text) {
        const attributeString = attributes
            .map(
                ({ property, value }) =>
                    property && value && ` ${property}="${value}"`
            )
            .join('');

        return text.replace(/(<[^>]+)/, `$1${attributeString}`);
    }

    return text;
};

export const transformLinks = ({ content, withSponsoredLink } = {}) => {
    if (content) {
        return content.replace(
            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
            (match, attributes, string) => {
                let newText = addAttribute({
                    attributes: [
                        {
                            property: 'title',
                            value: deleteTagsForTitle(string)
                        },
                        { property: 'class', value: 'link foodit-link' },
                        { property: 'data-variant', value: 'secondary' }
                    ],
                    text: match
                });

                const [, , link] = attributes.match(
                    /href=(["'\\])+(.*?)\1/
                ) || [null, null, '#'];

                const isInternalLink = link.includes('lanacion.com.ar');

                if (isInternalLink) {
                    newText = newText.replace(
                        /target=(["'\\])+(.*?)\1/,
                        'target="_self"'
                    );
                }

                if (!isInternalLink && !withSponsoredLink) {
                    newText = addAttribute({
                        attributes: [{ property: 'rel', value: 'nofollow' }],
                        text: newText
                    });
                }

                return newText;
            }
        );
    }
    return '';
};

export const transformElementText = ({
    element = {},
    withSponsoredLink
} = {}) => {
    const newElement = formatElementText(element);
    const content = compose(
        replaceClassForMark,
        setOtherChar,
        transformLinks,
        setItalicText,
        setBoldText
    )({ content: get(newElement, 'content', ''), withSponsoredLink });

    return {
        ...newElement,
        content
    };
};

export const configCallbackContentElements = {
    text: props => transformElementText(props),
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    custom_embed: ({ element }) =>
        get(element, 'subtype', '') !== 'custom-parallax' && element,
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
    },
    list: ({ element, withSponsoredLink } = {}) => {
        return {
            ...element,
            items: get(element, 'items', []).map(item =>
                transformElementText({
                    element: item,
                    withSponsoredLink
                })
            )
        };
    },
    header: props => transformElementText(props)
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
