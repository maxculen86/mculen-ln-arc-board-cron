import * as resizerV2 from './v2/resizerFactory';
import * as resizerV1 from '../resizer';
import get from '../../get';
import { STORYTELLING } from '../../subtypes/subtypeHelper';

export const addResizedUrls = (ansDoc, options) => {
    const {
        presets,
        presets: {
            promoItems: presetsPromoItems,
            contentElements: { sizes: presetsContentElements } = {},
            credits: presetsCredits,
            zoomSizes = []
        },
        presetsDefault,
        subtype,
        isInApertura,
        isAdmin
    } = options;

    const {
        promo_items: promoItems,
        content_elements: contentElements,
        credits,
        taxonomy: { primary_section: { _id: section = '' } = {} } = {}
    } = ansDoc;

    if (!presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );
    const presetsContentOrDefault = presetsContentElements || presetsDefault;
    const presetPromoOrDefault = presetsPromoItems || presetsDefault;

    const resizer = resizerV1.createResizer(isInApertura, isAdmin);

    const { defaultResize } = resizerV1.getDefaultSize(subtype);

    return {
        ...ansDoc,
        ...(contentElements && {
            content_elements: contentElements.map(elem => {
                const { type } = elem;
                return (
                    (type === 'image' &&
                        resizerV1.resizeArcImage(
                            elem,
                            presetsContentOrDefault,
                            resizer,
                            zoomSizes,
                            true,
                            defaultResize
                        )) ||
                    (type === 'gallery' &&
                        resizerV1.resizeArcGallery(
                            elem,
                            presetsContentOrDefault,
                            resizer,
                            zoomSizes,
                            true
                        )) ||
                    (type === 'video' && {
                        ...elem,
                        promo_items: {
                            basic: {
                                ...resizerV1.resizeArcImage(
                                    elem.promo_items.basic,
                                    presetsContentOrDefault,
                                    resizer,
                                    zoomSizes,
                                    true,
                                    defaultResize
                                )
                            }
                        }
                    }) ||
                    elem
                );
            })
        }),
        ...(promoItems && {
            promo_items: isAllowSection({ subtype, section, promoItems })
                ? resizerV2.resizePromoItems(
                      presetPromoOrDefault,
                      zoomSizes,
                      subtype,
                      promoItems
                  )
                : resizerV1.resizePromoItems(
                      promoItems,
                      presetPromoOrDefault,
                      resizer,
                      zoomSizes,
                      subtype
                  )
        }),
        ...(credits && {
            credits: resizerV1.resizeCredits(
                credits,
                presetsCredits || presetsDefault,
                resizer
            )
        })
    };
};

export const isAllowSection = ({ section, subtype, promoItems }) => {
    const allowList = [{ section: '/revista-living', subtype: STORYTELLING }];
    const authBasic = get(promoItems, 'basic.auth', {});
    const authStoryTellingMobile = get(
        promoItems,
        'storytelling_mobile.auth',
        {}
    );

    return allowList.some(
        itemAllow =>
            (authStoryTellingMobile !== {} || authBasic !== {}) &&
            section === itemAllow.section &&
            subtype === itemAllow.subtype
    );
};
