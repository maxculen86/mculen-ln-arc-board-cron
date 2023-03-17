import get from '../../../../components/private/common/utils/get';
import getImageResized from '../../../../components/private/common/utils/getImageResized';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import getVideoImagePresets from '../getVideoImagePresets';

export const resizeVideoImagesV2 = async ({
    data,
    presets,
    isInApertura,
    isAdmin,
    cachedCall,
    presetsDefault
}) => {
    const promoItems = get(data, 'promo_items.basic');
    const presetsPromoItems = get(presets, 'promo_items', null);

    const newData = await getAllImagesAuth(
        { promo_items: { apertura_multimedia: { ...data } } },
        cachedCall
    );

    Object.assign(data, newData);

    return {
        ...data,
        ...addResizedUrls(
            { promo_items: { basic: { ...promoItems } } },
            {
                presets: {
                    promoItems: presetsPromoItems,
                    presetsDefault
                },
                isInApertura,
                isAdmin,
                shouldUseV2: true,
                isVideoSource: true
            }
        )
    };
};

// TODO: Eliminar la funcion resizeVideoImagesV1 cuando se implemente resizer 2 en todo el sitio.
// Unificar el resizer de imagenes de videos de ott en la logica de resizeVideoImagesV2

export const resizeVideoImagesV1 = ({ data, arcSite, siteProps }) => {
    const presets = getVideoImagePresets(data, siteProps, arcSite);

    if (presets) {
        const {
            width,
            height,
            url,
            configSizes,
            isAdmin,
            isInApertura
        } = presets;

        const resizedUrl = getImageResized({
            url,
            originalHeight: height,
            originalWidth: width,
            options: configSizes,
            focalPoint: [],
            isInApertura,
            isAdmin
        });

        if (arcSite === 'ott') {
            const promoItems = get(data, 'promo_items.basic');
            const urlImage = get(resizedUrl[0], 'resizedUrl', '');

            return {
                ...data,
                promo_items: {
                    basic: {
                        ...promoItems,
                        resized_urls: resizedUrl,
                        url: urlImage
                    }
                }
            };
        }
        return {
            ...data,
            resizedUrl
        };
    }

    return data;
};
