import * as resizerV2 from './v2/resizerFactory';
import * as resizerV1 from '../resizer';
import { isValidString } from '../../dataValidation';

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
        isAdmin,
        shouldUseV2 = false,
        shouldUseV1
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
                if (
                    !shouldUseV1 &&
                    (isAllowSection({ section }) || shouldUseV2)
                ) {
                    return resizerV2.resizeContentElements(
                        elem,
                        presetsContentElements || presetsDefault,
                        zoomSizes,
                        defaultResize
                    );
                }
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
            promo_items:
                !shouldUseV1 && (isAllowSection({ section }) || shouldUseV2)
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
            credits:
                !shouldUseV1 && isAllowSection({ section })
                    ? resizerV2.resizeCredits(
                          credits,
                          presetsCredits || presetsDefault
                      )
                    : resizerV1.resizeCredits(
                          credits,
                          presetsCredits || presetsDefault,
                          resizer
                      )
        })
    };
};

export const isAllowSection = ({ section = '' }) => {
    const allowList = [
        '/revista-living',
        '/propiedades',
        '/seguridad',
        '/salud',
        '/revista-hola'
    ];

    return allowList.some(
        allowSection =>
            isValidString(section) && section.startsWith(allowSection)
    );
};
