import {
    STORYTELLING,
    RECETA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { getAllImagesAuth } from '../../signingServiceSource/getImagesAuth';
import get from '../../../../../components/private/common/utils/get';
import validateSponsoredLink from '../../validateSponsoredLink';
import getProperties from 'fusion:properties';
import {
    configCallbacksRelatedContent,
    configCallbackContentElements,
    configPromoItems
} from './_configs';
import {
    transformElementsBasedOnType,
    transformPromoItems,
    formatElementText,
    transformAuthors,
    filterSections
} from '../../articleSourceNota/_helper';
import { compose } from '../../../../../components/private/common/utils/functional';

export const getImageConfig = (response, query) => {
    const siteProperties = getProperties('foodit');
    const customImageConfig = get(query, 'imageConfig');

    if (customImageConfig) {
        return {
            promoItems: get(
                siteProperties,
                `imageConfig.resize.${customImageConfig}.promo_items`,
                {}
            )
        };
    }

    const imgConfigDefault = get(
        siteProperties,
        `imageConfig.resize.default`,
        null
    );

    const pathImageConfigFichaNota = 'imageConfig.resize.fichaNotaAl100';
    const imgConfigFichaReceta = 'imageConfig.resize.fichaReceta';

    const imgConfigBySubtype = {
        [STORYTELLING]: {
            promoItems: get(
                siteProperties,
                `${pathImageConfigFichaNota}.promo_items`,
                imgConfigDefault
            ),
            contentElements: get(
                siteProperties,
                `${pathImageConfigFichaNota}.content_elements`,
                imgConfigDefault
            ),
            credits: get(
                siteProperties,
                `${pathImageConfigFichaNota}.credits`,
                imgConfigDefault
            ),
            presetsDefault: imgConfigDefault
        },
        [RECETA]: {
            promoItems: get(
                siteProperties,
                `${imgConfigFichaReceta}.promo_items`,
                imgConfigDefault
            ),
            contentElements: get(
                siteProperties,
                `${imgConfigFichaReceta}.content_elements`,
                imgConfigDefault
            ),
            credits: get(
                siteProperties,
                `${imgConfigFichaReceta}.credits`,
                imgConfigDefault
            ),
            presetsDefault: imgConfigDefault
        },
        default: {
            promoItems: imgConfigDefault,
            contentElements: imgConfigDefault,
            credits: imgConfigDefault
        }
    };

    return (
        imgConfigBySubtype[get(response, 'subtype', '')] ||
        imgConfigBySubtype.default
    );
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

export const getArticleSubtype = subtype => {
    if (![STORYTELLING, RECETA].includes(subtype)) {
        return STORYTELLING;
    }
    return subtype;
};

// TODO: Pendiente por sumar tests al transform
export const transform = async (result, query, cachedCall) => {
    const { meteringVariant, paywallEnabled = '' } = query;

    const arcSite = query['arc-site'];
    const siteProperties = getProperties(query[arcSite]);

    const subtype = getArticleSubtype(get(result, 'subtype', null));

    const aditionalProps = {
        withSponsoredLink: validateSponsoredLink(result),
        siteProperties,
        cachedCall,
        subtype,
        arcSite
    };

    const [
        promo_items,
        content_elements,
        relatedContentBasic
    ] = await Promise.all([
        transformPromoItems({
            cachedCall,
            arcSite,
            configCallbacks: configPromoItems,
            promoItemObject: get(result, 'promo_items', {})
        }),
        Promise.all(
            transformElementsBasedOnType({
                arrayElements: get(result, 'content_elements', []),
                configCallbacks: configCallbackContentElements,
                searchPropertyOnElem: 'type',
                aditionalProps
            })
        ),
        Promise.all(
            transformElementsBasedOnType({
                arrayElements: get(result, 'related_content.basic', []),
                configCallbacks: configCallbacksRelatedContent,
                searchPropertyOnElem: 'type',
                aditionalProps
            })
        )
    ]);

    return {
        ...result,
        subtype,
        promo_items,
        content_elements,
        related_content: {
            ...get(result, 'related_content', {}),
            basic: relatedContentBasic
        },
        paywallEnabled,
        subscription: meteringVariant,
        credits: {
            ...get(result, 'credits', {}),
            by: transformAuthors(get(result, 'credits.by', []))
        },
        taxonomy: filterSections(result),
        category: get(result, 'taxonomy.primary_section.name', '')
    };
};
