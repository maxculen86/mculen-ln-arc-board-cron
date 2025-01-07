import { VIDEO_CDN_URL } from 'fusion:environment';
import get from '../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';

export const resizeVideoImagesV2 = async ({
    data,
    presets,
    siteProps,
    cachedCall,
    presetsDefault
}) => {
    const promoItems = get(data, 'promo_items.basic');
    const presetsPromoItems = get(presets, 'promo_items', null);
    const isAdmin = get(siteProps, 'isAdmin', false);
    const isInApertura = get(siteProps, 'isInApertura', false);

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
                isVideoSource: true
            }
        )
    };
};

export const updateVideoUrl = videoData => {
    const pattern = /https:\/\/[\w.-]+\//;

    const streamsWithUpdatedUrl = get(videoData, 'streams', []).map(elem => {
        const urlVideo = get(elem, 'url', '');

        return {
            ...elem,
            url: urlVideo?.replace(pattern, VIDEO_CDN_URL)
        };
    });

    return {
        ...videoData,
        streams: streamsWithUpdatedUrl
    };
};
