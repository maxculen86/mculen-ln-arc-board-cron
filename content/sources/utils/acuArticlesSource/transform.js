import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer';
import getPresets from '../presets';
import get from '../../../../components/private/common/utils/get';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';
import { isNotRecommend } from '../collectionsHelper';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThanXHoursAgo
} from '../../../../components/private/common/utils/dateAndTimeUtil';

const transform = (data, siteProps) => {
    // eslint-disable-next-line no-console
    console.warn('Acu article source - transform. Param data value: ', data);

    const respData = data;
    const { sectionsIds, type, size, shouldNotFilter } = siteProps;
    const { content_elements: contentElements } = data || {};
    const { presets, presetsDefault } = getPresets(siteProps);

    const presetsPromoItems = get(presets, 'promo_items', null);

    respData.content_elements =
        contentElements &&
        contentElements.map((elem, index) => {
            const promoItems = get(elem, `promo_items`, null);
            const subtype = get(elem, `subtype`, null);
            const presetsCredits = get(presets, 'credits', null);
            const credits = get(elem, 'credits', null);
            const api = get(siteProps, 'api', false);
            const isFotoAl100orStorytelling =
                subtype === FOTOAL100 || subtype === STORYTELLING;
            return {
                ...elem,
                ...addResizedUrls(
                    {
                        ...(promoItems && { promo_items: promoItems }),
                        ...(api && credits && { credits })
                    },
                    {
                        resizerSecret: RESIZER_KEY,
                        resizerUrl: RESIZER_URL,
                        presets: {
                            promoItems: presetsPromoItems,
                            ...(api && credits && { credits: presetsCredits }),
                            presetsDefault
                        },
                        // Se pasa el subtype para que las notas de foto al 100
                        // y storytelling no sean excluidas de las validaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype,
                        isInApertura: index === 0
                    }
                )
            };
        });

    // Si viene de mas notas return solo las necesarias mas 1 por si se excluye misma nota
    if (type === 'story') {
        const originalSize = Math.floor(size / 1.5);
        respData.content_elements = respData.content_elements
            .filter(art => (shouldNotFilter ? art : !isNotRecommend(art)))
            .slice(0, Number(originalSize) + 1);
    }
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
    if (sectionsIds) {
        respData.content_elements = respData.content_elements
            .filter(story => !isOlderThanXHoursAgo(story.display_date, 24))
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
    }

    return respData;
};

export default transform;
