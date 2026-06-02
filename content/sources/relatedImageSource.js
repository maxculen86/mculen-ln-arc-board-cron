import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import get from '../../components/private/common/utils/get';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import logger from '../../components/private/common/utils/logger';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

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

const transform = async (data, siteProps, cachedCall) => {
    const { presets, presetsDefault } = getPresets(siteProps);
    const newData = await getAllImagesAuth(data, cachedCall);
    Object.assign(data, newData);

    const { height, width } = data;
    const useDataSizes =
        height && width && get(siteProps, 'useDataSizes', false);
    const dataSizes = useDataSizes && {
        sizes: [{ height, width }]
    };

    const presetsPromoItems = get(presets, 'promo_items', null);
    const subtype = get(siteProps, 'subtype', null);
    const isInApertura = get(siteProps, 'isInApertura', false);
    const isAdmin = get(siteProps, 'isAdmin', false);
    const isFotoAl100orStorytelling =
        subtype === FOTOAL100 || subtype === STORYTELLING;

    return {
        ...addResizedUrls(
            { promo_items: { basic: { ...data } } },
            {
                presets: {
                    promoItems: useDataSizes ? dataSizes : presetsPromoItems,
                    presetsDefault
                },
                // Se pasa el subtype para que las notas de foto al 100
                // y storytelling no sean excluidas de las validaciones del resizer
                // y pueda aplicarse 3:2, focal point o smartcrop
                subtype: isFotoAl100orStorytelling ? '-1' : subtype,
                isInApertura,
                isAdmin,
                arcSite: get(siteProps, 'arc-site', 'lanacionar')
            }
        )
    };
};

const fetch = async (query, { cachedCall } = {}) => {
    const { id = '' } = query;
    const arcSite = query['arc-site'];

    const opt = { method: 'GET' };
    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `${CONTENT_BASE}${resolve(query)}`,
                opt
            );
            handleHttpError(response);
            const data = await response.json();
            return transform(data, query, cachedCall);
        } catch (err) {
            logger.push(
                err,
                {
                    source: 'content/sources/relatedImageSource',
                    id
                },
                arcSite
            );
            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        id: 'text',
        subtype: 'text',
        imageConfig: 'text',
        isAddRelated: 'text',
        nid: 'text',
        boxType: 'text',
        useDataSizes: 'bool',
        isInApertura: 'bool'
    },
    ttl: 600
};
