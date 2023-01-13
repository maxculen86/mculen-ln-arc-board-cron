// TODO: solo para sandbox implementacion API_ENV Sandbox
// import { API_ENV } from 'fusion:environment';
// import * as resizerV1 from './v1/resizerHelper';
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

    const resizer = resizerV1.createResizer(isInApertura, isAdmin);

    const { defaultResize } = resizerV1.getDefaultSize(subtype);

    return {
        ...ansDoc,
        ...(contentElements && {
            content_elements: contentElements.map(elem => {
                if (isAllowSection({ section })) {
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
                            presetsContentElements || presetsDefault,
                            resizer,
                            zoomSizes,
                            true,
                            defaultResize
                        )) ||
                    (type === 'gallery' &&
                        resizerV1.resizeArcGallery(
                            elem,
                            presetsContentElements || presetsDefault,
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
                                    presetsContentElements || presetsDefault,
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
            promo_items: isAllowSection({ section })
                ? resizerV2.resizePromoItems(
                      presetsPromoItems || presetsDefault,
                      zoomSizes,
                      subtype,
                      promoItems
                  )
                : resizerV1.resizePromoItems(
                      promoItems,
                      presetsPromoItems || presetsDefault,
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
