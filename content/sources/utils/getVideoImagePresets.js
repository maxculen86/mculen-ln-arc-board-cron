import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getVideoImagePresets = (data, siteProps) => {
    const arcSite = get(siteProps, 'arc-site', '');
    const diagramacion = get(siteProps, 'imageConfig', '');
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
};

export default getVideoImagePresets;
