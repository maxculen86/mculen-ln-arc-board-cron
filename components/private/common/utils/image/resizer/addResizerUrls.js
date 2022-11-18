// TODO: solo para sandbox implementacion API_ENV Sandbox
// import { API_ENV } from 'fusion:environment';
// import * as resizerV1 from './v1/resizerHelper';
import * as resizerV2 from './v2/resizerFactory';
import * as resizerV1 from '../resizer';

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
    console.log('🚀 ~ file: options', JSON.stringify(options, null, 2));

    const {
        promo_items: promoItems,
        content_elements: contentElements,
        credits,
        taxonomy: { primary_section: { _id: section = '' } = {} } = {}
    } = ansDoc;
    console.log('🚀 ~ file: ansDoc', JSON.stringify(ansDoc, null, 2));

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
                    elem
                );
            })
        }),
        ...(promoItems && {
            promo_items: isAllowSection({ subtype, section })
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

export const isAllowSection = ({ section, subtype }) => {
    const allowList = [{ section: '/revista-living', subtype: '4' }];

    return allowList.some(
        itemAllow =>
            section === itemAllow.section && subtype === itemAllow.subtype
    );
};
