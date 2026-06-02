import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';

const resolve = key => {
    const { Ids, website } = key;

    const arcSite = key['arc-site'];
    const uriParams = [
        `${
            key && key.sourceInclude && key.sourceInclude !== ''
                ? `&included_fields=${key.sourceInclude}`
                : ''
        }`
    ].join('');

    let basePath = '';
    basePath = `/content/v4/ids/?website=${website || arcSite}`;
    if (uriParams && uriParams !== '') {
        basePath = `${basePath}${uriParams}`;
    }
    if (Ids) return `${basePath}&ids=${Ids}`;

    throw new Error('Debe definir los Ids para obtener las notas');
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
            const presetsCredits = get(presets, 'credits', null);
            const credits = get(elem, 'credits', null);
            const isFotoAl100orStorytelling =
                subtype === FOTOAL100 || subtype === STORYTELLING;
            return {
                ...elem,
                ...addResizedUrls(
                    {
                        ...(promoItems && { promo_items: promoItems }),
                        ...(credits && { credits })
                    },
                    {
                        presets: {
                            promoItems: presetsPromoItems,
                            ...(credits && { credits: presetsCredits }),
                            presetsDefault
                        },
                        // Se pasa el subtype para que las notas de foto al 100
                        // y storytelling no sean excluidas de las validaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype,
                        arcSite: get(siteProps, 'arc-site', 'lanacionar')
                    }
                )
            };
        });

    // De todos los Content Elements, solo traigo el primero que sea parrafo
    // (para no mandar mas info innecesaria)
    respData.content_elements = respData.content_elements.map(story => ({
        ...story,
        content_elements: [
            (story.content_elements &&
                story.content_elements.find(e => e.type === 'text')) ||
                {}
        ]
    }));
    respData.content_elements = resultsIds.map(orderId =>
        respData.content_elements.find(story => get(story, '_id') === orderId)
    );

    return respData;
};

const fetch = query => {
    const { Ids, sizeMax, uri } = query;

    const arcSite = query['arc-site'];

    let resultsIds = Ids?.split(/[ ,]+/);
    resultsIds = resultsIds?.filter(x => x !== '');

    if (resultsIds && sizeMax && sizeMax < resultsIds.length) {
        throw new Error(
            `Error en validacion del máximo permitido: ${resultsIds.length}`
        );
    }

    const opt = {
        method: 'GET'
    };
    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }
    return global
        .fetch(`${CONTENT_BASE}${resolve(query)}`, opt)
        .then(response => response.json())
        .then(data => {
            const objresponse = {};

            Object.entries(data).forEach(([key, value]) => {
                objresponse[key] = value;
            });

            objresponse.count = resultsIds?.length;
            objresponse.next = null;

            return transform(objresponse, query, resultsIds);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/acuArticlesSourcebyIds', uri },
                arcSite
            );
        });
};

export default {
    fetch,
    params: {
        Ids: 'text',
        sizeMax: 'text',
        sourceInclude: 'text'
    },
    ttl: 120
};
