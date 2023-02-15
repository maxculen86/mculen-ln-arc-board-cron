import get from '../../../../../../../../components/private/common/utils/get';
import equal from './equal';

export const atleastone = (element, configBanner, lengthBannersPrevious) => {
    if (!element || !configBanner) {
        return false;
    }

    return (
        configBanner &&
        Array.isArray(configBanner.conditions) &&
        configBanner.conditions.some(config => {
            const configBannerNew = {
                ...config,
                keyFind: configBanner.keyFind
            };
            return equal(element, configBannerNew, lengthBannersPrevious);
        })
    );
};

export default atleastone;
