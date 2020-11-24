import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';

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

const transform = (data, siteProps) => {
    const respData = data;
    const { content_elements: contentElements } = data || {};
    const { presets, presetsDefault } = getPresets(siteProps);

    const presetsPromoItems = get(presets, 'promo_items', null);

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
                        // y storytelling no sean excluidas de las elemalidaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype
                    }
                ),
                ...(elem.canonical_url && { website_url: elem.canonical_url })
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
    ttl: 120
};
