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
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';

const resolve = key => {
    const { id, size, website, from = 0 } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}&from=${from}`;
};

const fetch = query => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
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
            return transform(response, query);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

const transform = (data, siteProps) => {
    const respData = data;
    console.log("🚀 ~ file: collectionsSource.js ~ line 55 ~ transform ~ data", JSON.stringify(data))
    const { content_elements: contentElements } = data || {};
    const { presets, presetsDefault, presetsCredits } = getPresets(siteProps);

    const presetsPromoItems = get(presets, 'promo_items', null);

    respData.content_elements =
        contentElements &&
        contentElements.map(elem => {
            const subtype = get(elem, `subtype`, null);
            const isFotoAl100orStorytelling =
                subtype === FOTOAL100 || subtype === STORYTELLING;
            return {
                ...elem,
                ...addResizedUrls(elem, {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems,
                        presetsDefault,
                        credits: presetsCredits
                    },
                    // Se pasa el subtype para que las notas de foto al 100
                    // y storytelling no sean excluidas de las elemalidaciones del resizer
                    // y pueda aplicarse 3:2, focal point o smartcrop
                    subtype: isFotoAl100orStorytelling ? '-1' : subtype
                }),
                ...(elem.canonical_url && { website_url: elem.canonical_url })
            };
        });
    return respData;
};

export default {
    fetch,
    params: {
        id: 'text',
        size: 'text',
        imageConfig: 'text',
        website: 'text'
    },
    ttl: 120
};
