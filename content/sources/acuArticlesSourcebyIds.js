import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThan24HourAgo
} from '../../components/private/common/utils/dateAndTimeUtil';

const resolve = key => {
    const { Ids, website } = key;

    const arcSite = key['arc-site'];
    const basePath = `/content/v4/ids/?website=${website || arcSite}`;

    if (Ids) return `${basePath}&ids=${Ids}&sort=display_date:desc`;

    throw new Error('Debe definir los Ids para obtener las notas');
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

    // Si viene de Ultimas Noticias
    /*     if (sectionsIds) {
        respData.content_elements = respData.content_elements
            .filter(story => !isOlderThan24HourAgo(story.display_date))
            .filter(story => !hasFutureDisplayDate(story.display_date))
            .map(story => {
                return {
                    ...story,
                    display_date: addHoursAndFormat(-3, story.display_date),
                    website_url: story.canonical_url
                };
            });
        if (respData.content_elements.length === 0) {
            respData.next = 0;
        }
    } */

    return respData;
};

export default {
    resolve,
    transform,
    params: {
        Ids: 'text',
        sizeMax: 'text'
    },
    ttl: 120
};
