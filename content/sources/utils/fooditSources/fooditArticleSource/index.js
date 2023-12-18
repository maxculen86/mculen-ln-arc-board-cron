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
    transformAuthors,
    filterSections
} from '../../articleSourceNota/_helper';

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

export const addAttribute = ({ nameAttribute, valueAttribute, text = '' }) => {
    if (valueAttribute && nameAttribute && text) {
        return text.replace(
            /(<[^>]+)/,
            `$1 ${nameAttribute}="${valueAttribute}"`
        );
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

export const setExternalLinks = ({ content, withSponsoredLink } = {}) => {
    if (content) {
        return content.replace(
            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
            (match, atributtes, string) => {
                let newText = addAttribute({
                    nameAttribute: 'title',
                    valueAttribute: deleteTagsForTitle(string),
                    text: match
                });

                const [, , link] = atributtes.match(
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
                        nameAttribute: 'rel',
                        valueAttribute: 'nofollow',
                        text: newText
                    });
                }

                return newText;
            }
        );
    }
    return '';
};
// TODO: Pendiente por sumar tests al transform
export const transform = async (response, query, cachedCall) => {
    const {
        meteringVariant,
        paywallEnabled = '',
        isInApertura = false,
        isAdmin = false
    } = query;

    const arcSite = query['arc-site'];
    const siteProperties = getProperties(query[arcSite]);

    const newData = await getAllImagesAuth(response, cachedCall);
    Object.assign(response, newData);

    const subtype = get(response, 'subtype', null);

    const result = {
        ...response,
        ...addResizedUrls(response, {
            presets: {
                ...getImageConfig(response, query)
            },
            subtype,
            isInApertura,
            isAdmin,
            shouldUseV1: false,
            shouldUseV2: true
        })
    };

    const aditionalProps = {
        withSponsoredLink: validateSponsoredLink(response),
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
        taxonomy: filterSections(response),
        category: get(response, 'taxonomy.primary_section.name', '')
    };
};
