import request from 'request-promise-native';
import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    RESIZER_KEY,
    RESIZER_URL
} from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';

const resolve = key => {
    const { Ids, website } = key;

    const arcSite = key['arc-site'];
    const basePath = `/content/v4/ids/?website=${website || arcSite}`;

    if (Ids) return `${basePath}&ids=${Ids}`;

    throw new Error('Debe definir los Ids para obtener las notas');
};

const fetch = query => {
    const { Ids, sizeMax, uri } = query;

    const arcSite = query['arc-site'];

    const resultsIds = Ids.split(/[ ,]+/);

    if (sizeMax && sizeMax < resultsIds.length) {
        throw new Error(
            `Error en validacion del máximo permitido: ${resultsIds.length}`
        );
    }

    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(response => {
            const objresponse = {};
            Object.entries(response).map(([key, value]) => {
                objresponse[key] = value;
            });

            objresponse.count = resultsIds.length;
            objresponse.next = null;
            return transform(objresponse, query, resultsIds);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', uri }, arcSite);
            throw error;
        });
};

const transform = (data, siteProps, resultsIds) => {
    const respData = data;
    const { content_elements: contentElements } = data || {};
    const { presets, presetsDefault } = getPresets(siteProps);
    const { sizeMax } = siteProps;

    const presetsPromoItems = get(presets, 'promo_items', null);

    // Si viene mas de las notas permitidas
    if (sizeMax) {
        if (respData.content_elements.length > sizeMax) {
            throw new Error('El número de notas excede el permitido');
        }
    }

    respData.content_elements =
        contentElements &&
        contentElements.map(elem => {
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

    // De todos los Content Elements, solo traigo el primero que sea parrafo
    // (para no mandar mas info innecesaria)
    respData.content_elements = respData.content_elements.map(story => {
        return {
            ...story,
            content_elements: [
                (story.content_elements &&
                    story.content_elements.find(e => e.type === 'text')) ||
                    {}
            ]
        };
    });
    respData.content_elements = resultsIds.map(orderId => {
        return respData.content_elements.find(story => story._id === orderId);
    });

    return respData;
};

export default {
    fetch,
    params: {
        Ids: 'text',
        sizeMax: 'text'
    },
    ttl: 120
};
