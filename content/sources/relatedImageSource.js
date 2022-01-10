import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';

const resolve = key => {
    const { id, nid, boxType, subtype, imageConfig, isAddRelated } = key;
    if (!id)
        throw new Error('Debe definir id para obtener la imagen', {
            id,
            subtype,
            imageConfig,
            isAddRelated,
            nid,
            boxType
        });
    return `/photo/api/v2/photos/${id}`;
};

const transform = (data, siteProps) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);
    const subtype = get(siteProps, `subtype`, null);
    const isFotoAl100orStorytelling =
        subtype === FOTOAL100 || subtype === STORYTELLING;

    return {
        ...addResizedUrls(
            { promo_items: { basic: { ...data } } },
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
};

export default {
    resolve,
    params: {
        id: 'text',
        subtype: 'text',
        imageConfig: 'text',
        isAddRelated: 'text',
        nid: 'text',
        boxType: 'text'
    },
    transform,
    ttl: 600
};
