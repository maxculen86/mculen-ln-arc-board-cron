import request from 'request-promise-native';
import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import sourceSetting from './utils/sourceSetting';
import {
    createResizer,
    resizePromoItems
} from '../../components/private/common/utils/image/resizer';
import getPresets from './utils/presets';

/**
 * TODO: Por completar de tarea
 * 1. Pasar variables a encriptar y a ambiente
 */

const JSK_ID = '8561ps8ov66e7mim';
const LIFTIGNITER_X_API_KEY = '2f03f8f6-6086-4203-a8e7-8eede90d6766';
const WIDGETS = 'li-nacion-recommended-item-template-1';

const transformArticles = (liftigniterArticles = []) =>
    liftigniterArticles.map(({ url, id, title, image }) => ({
        subtype: 1,
        by: {},
        website_url: url,
        _id: id,
        headlines: { basic: title },
        promo_items: {
            basic: {
                type: 'image',
                url: image
            }
        }
    }));

/**
 * TODO: Por completar de tarea
 * 1. Mejorar armado de uri, version, endpoint y body como parametro de liftigniter
 */

const fetch = query => {
    const { cantidadNotas, referrer } = query;
    return request({
        uri: `https://query.petametrics.com/v3/${JSK_ID}/model`,
        method: 'POST',
        headers: {
            'Accept-Encoding': '*,q=0.8',
            'Content-Type': 'application/json',
            'x-api-key': LIFTIGNITER_X_API_KEY
        },
        body: JSON.stringify({
            widgetName: WIDGETS,
            maxCount: cantidadNotas,
            requestFields: ['url', 'title', 'image', 'id', 'published_time'],
            referrer
        })
    })
        .then(response => {
            const { items } = JSON.parse(response);
            return transformArticles(items);
        })
        .catch(() => {
            // TODO: Implementar registro de error en logger
            return [];
        });
};

/**
 * TODO: Por completar de tarea
 * 1. fijarse en funcion de acuArticlesSource para crear utilitario de promoItems
 */

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
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    return data.map(elem => {
        return {
            ...getImageResized(elem, {
                resizerSecret: RESIZER_KEY,
                resizerUrl: RESIZER_URL,
                presets: {
                    promoItems: presetsPromoItems,
                    presetsDefault
                }
            })
        };
    });
};

/**
 * TODO: Por completar de tarea
 * 3. Confirmar el ttl
 */
export default {
    fetch,
    transform,
    ttl: sourceSetting.liftigniterSource.ttl
};
