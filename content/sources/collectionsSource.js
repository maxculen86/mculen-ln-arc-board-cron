import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import sourceSetting from './utils/sourceSetting';
import {
    createResizer,
    resizePromoItems
} from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';
import { getAspectRatio } from './utils/getRatio';

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

    const presetsPromoItems = get(presets, 'promo_items', presetsDefault);
    const presetsContentElement = get(
        presets,
        'content_elements',
        presetsDefault
    );
    const presetsCredits = get(presets, 'credits', presetsDefault);

    respData.content_elements =
        contentElements &&
        contentElements.map(v => {
            return {
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
