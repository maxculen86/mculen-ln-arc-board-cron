import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import {
    addResizedUrls,
    createResizer,
    resizeArcImage,
    resizePromoItems
} from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';
import { getAspectRatio } from './utils/getRatio';
// import getImageResized from '../../components/private/common/utils/getImageResized';

const resolve = key => {
    const { id, size, website } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}`;
};

const getImageResized = (ansDoc, options) => {
    const {
        resizerSecret,
        resizerUrl,
        presets,
        presets: { promoItems: presetsPromoItems, zoomSizes = [] },
        presetsDefault
    } = options;
    const { promo_items: promoItems } = ansDoc;

    if (!resizerSecret || !resizerUrl || !presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );

    const resizer = createResizer(resizerSecret, resizerUrl);
    return {
        ...ansDoc,
        ...(promoItems && {
            promo_items: resizePromoItems(
                promoItems,
                presetsPromoItems || presetsDefault,
                resizer,
                zoomSizes,
                '-1'
            )
        })
        // ...(promoItems &&
        //     promoItems.basic && {
        //         promo_items:
        //             promoItems.basic.type === 'image'
        //                 ? {
        //                       basic: resizeArcImage(
        //                           promoItems.basic,
        //                           presetsPromoItems,
        //                           resizer,
        //                           zoomSizes,
        //                           false,
        //                           presetsDefault
        //                       )
        //                   }
        //                 : { ...promoItems }
        //     })
    };
};

const transform = (data, siteProps) => {
    const respData = data;
    const { content_elements: contentElements } = data || {};
    const properties = getProperties(siteProps['arc-site']);

    const presetsDefault = get(properties, 'imageConfig.resize.default', null);
    const presetsSize = get(siteProps, 'imageConfig', 'default');
    const presets = get(
        properties,
        `imageConfig.resize.${presetsSize}`,
        presetsDefault
    );

    const presetsPromoItems = get(presets, 'promo_items', null);
    const presetsContentElement = get(presets, 'content_elements', null);
    const presetsCredits = get(presets, 'credits', null);

    respData.content_elements =
        contentElements &&
        contentElements.map(v => {
            return {
                // ...addResizedUrls(v, {
                //     resizerSecret: RESIZER_KEY,
                //     resizerUrl: RESIZER_URL,
                //     presets: {
                //         promoItems: presetsPromoItems,
                //         contentElements: presetsContentElement,
                //         credits: presetsCredits,
                //         presetsDefault
                //     }
                // }),
                ...getImageResized(v, {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems,
                        contentElements: presetsContentElement,
                        credits: presetsCredits,
                        presetsDefault
                    }
                }),
                ...(v.canonical_url && { website_url: v.canonical_url })
            };
        });
    return respData;
};

// const transformContent = (jsonArticle, presetsPromoItems) => {
//     const promiseArr = [];

//     if (get(jsonArticle, 'promo_items.basic.type') === 'image') {
//         promiseArr.push(
//             new Promise(resolver =>
//                 resolver(
//                     getImageResized(
//                         get(jsonArticle, 'promo_items.basic.url'),
//                         presetsPromoItems
//                     )
//                 )
//             ).then(url => {
//                 if (url) console.log('transformContent -> url', url);
//             })
//         );
//     }

//     return Promise.all(promiseArr).then(() => {
//         return jsonArticle;
//     });
// };

export default {
    resolve,
    params: {
        id: 'text',
        size: 'text',
        imageConfig: 'text',
        website: 'text'
    },
    transform,
    ttl: sourceSetting.collectionSource.ttl
};
