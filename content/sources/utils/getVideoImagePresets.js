import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getVideoImagePresets = (data, siteProps, arcSite) => {
    if (arcSite) {
        const diagramacion =
            arcSite === 'la-nacion-ar'
                ? get(siteProps, 'imageConfig', '')
                : 'videoImage';

        const resize = get(getProperties(arcSite), 'imageConfig.resize', {});
        const { width, height, url } = get(data, 'promo_items.basic', {});

        return {
            width,
            height,
            url,
            configSizes: get(resize[diagramacion], 'promo_items.sizes', []),
            isAdmin: get(siteProps, 'isAdmin', false),
            isInApertura: get(siteProps, 'isInApertura', false)
        };
    }

    return null;
};

export default getVideoImagePresets;
