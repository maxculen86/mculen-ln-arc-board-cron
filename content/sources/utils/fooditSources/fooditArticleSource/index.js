import getProperties from 'fusion:properties';
import {
    STORYTELLING,
    RECETA,
    RECETA_CERRADA,
    NOTA_CERRADA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../../../../components/private/common/utils/get';
import validateSponsoredLink from '../../validateSponsoredLink';
import { configCallbackContentElements, configPromoItems } from './_configs';
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

export const getArticleSubtype = (subtype, isExclusiveSuscriptor = false) => {
    if (![STORYTELLING, RECETA].includes(subtype)) {
        return STORYTELLING;
    }

    if (subtype === STORYTELLING && isExclusiveSuscriptor) return NOTA_CERRADA;
    if (subtype === RECETA && isExclusiveSuscriptor) return RECETA_CERRADA;

    return subtype;
};

export const transform = async (
    result,
    query,
    cachedCall,
    customCallbacksConfig = {}
) => {
    const { meteringVariant, paywallEnabled = '' } = query;
    const {
        isExclusiveSuscriptor = false,
        customConfigCallbackContentElements
    } = customCallbacksConfig;

    const arcSite = query['arc-site'];
    const siteProperties = getProperties(query[arcSite]);

    const subtype = getArticleSubtype(
        get(result, 'subtype', null),
        isExclusiveSuscriptor
    );

    const aditionalProps = {
        withSponsoredLink: validateSponsoredLink(result),
        siteProperties,
        cachedCall,
        subtype,
        arcSite
    };

    const arrayElements =
        subtype === NOTA_CERRADA
            ? get(result, 'content_elements', []).slice(0, 1)
            : get(result, 'content_elements', []);

    const [promoItems, contentElements, relatedContentBasic] =
        await Promise.all([
            transformPromoItems({
                cachedCall,
                arcSite,
                configCallbacks: configPromoItems,
                promoItemObject: get(result, 'promo_items', {})
            }),
            Promise.all(
                transformElementsBasedOnType({
                    arrayElements,
                    configCallbacks:
                        customConfigCallbackContentElements ||
                        configCallbackContentElements,
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
