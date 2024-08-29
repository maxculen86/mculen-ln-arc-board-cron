import {
    STORYTELLING,
    RECETA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
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
        promoItems,
        contentElements,
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
        promo_items: promoItems,
        content_elements: contentElements,
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
