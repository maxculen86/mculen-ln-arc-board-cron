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
import getSizesFrom from '../../components/private/common/utils/getSizesFrom';

const resolve = key => {
    const { Ids, website } = key;

    const arcSite = key['arc-site'];
    const basePath = `/content/v4/ids/?website=${website || arcSite}`;

    if (Ids) return `${basePath}&ids=${Ids}&sort=display_date:desc`;

    throw new Error('Debe definir los Ids para obtener las notas');
};

const fetch = query => {
    const { Ids, website, size: sizeCf, page: pageCf, uri } = query;
    let isAdmin = true;
    if (uri) {
        isAdmin = false;
    }
    const arcSite = query['arc-site'];
    const { size, page } = getSizesFrom(isAdmin, sizeCf, pageCf, 'params', uri);

    const resultData = Ids.split(/[ ,]+/);
    const currentIds = changePage(resultData, size, page);
    const objquery = {};
    Object.entries(query).map(([key, value]) => {
        let newvalue = query[key];
        if (key === 'size') {
            newvalue = size;
        }
        if (key === 'page') {
            newvalue = page;
        }
        if (key === 'Ids') {
            newvalue = currentIds;
        }
        objquery[key] = newvalue;
    });

    const opt = {
        uri: `${CONTENT_BASE}${resolve(objquery)}`,
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

            objresponse.count = Ids.length;
            objresponse.next = page * size;
            const previous = objresponse.next - size * 2;
            objresponse.previous = previous < 0 ? null : previous;
            return transform(objresponse, query);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', uri }, arcSite);
            throw error;
        });
};

const transform = (data, siteProps) => {
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

    return respData;
};

const changePage = (data, pageLimit, currentPage) => {
    const offset = (currentPage - 1) * pageLimit;
    const currentData = data.slice(offset, offset + pageLimit);
    return currentData;
};

export default {
    fetch,
    params: {
        Ids: 'text',
        // sizeMax: 'text',
        size: 'text',
        page: 'text'
    },
    ttl: 120
};
