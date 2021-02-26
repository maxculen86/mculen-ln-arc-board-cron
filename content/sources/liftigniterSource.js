import request from 'request-promise-native';
import {
    RESIZER_KEY,
    RESIZER_URL,
    WIDGETS,
    LIFTIGNITER_X_API_KEY,
    JSK_ID,
    SITE_LANACION
} from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import getPresets from './utils/presets';

const transformArticles = (liftigniterArticles = []) =>
    liftigniterArticles &&
    liftigniterArticles
        .filter(
            e =>
                e.image &&
                !(e.image && e.image.includes('/images/placeholderLN.jpg'))
        )
        .map(({ url, id, title, image }) => ({
            subtype: 1,
            by: {},
            website_url: url,
            _id: id,
            headlines: {
                basic: title
            },
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
    const {
        cantidadNotas = 10,
        referrer = SITE_LANACION,
        imageConfig = 'm',
        idArticle,
        userId,
        sessionId,
        excludeItems
    } = query;

    const userIdParam = userId ? `/${userId}` : '';

    return request({
        uri: `https://query.petametrics.com/v3/${JSK_ID}${userIdParam}/model`,
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
            referrer,
            pageviewId: idArticle,
            url: referrer,
            sessionId,
            excludeItems
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

const transform = (data, siteProps) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    return data.map(elem => {
        const promoItems = get(elem, `promo_items`, null);
        const subtype = get(elem, `subtype`, null);
        const isFotoAl100orStorytelling =
            subtype === FOTOAL100 || subtype === STORYTELLING;
        return {
            ...elem,
            ...addResizedUrls(
                { ...(promoItems && { promo_items: promoItems }) },
                {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems,
                        presetsDefault
                    },
                    // Se pasa el subtype para que las notas de foto al 100
                    // y storytelling no sean excluidas de las validaciones del resizer
                    // y pueda aplicarse 3:2, focal point o smartcrop
                    subtype: isFotoAl100orStorytelling ? '-1' : subtype
                }
            )
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
    params: {
        cantidadNotas: 'text',
        referrer: 'text',
        imageConfig: 'text'
    },
    ttl: 120
};
