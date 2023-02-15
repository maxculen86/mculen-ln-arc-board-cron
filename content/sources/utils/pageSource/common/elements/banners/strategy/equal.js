import get from '../../../../../../../../components/private/common/utils/get';

export const equal = (element, configBanner, lengthBannersPrevious) => {
    //  console.log(configBanner, lengthBannersPrevious);
    if (!element || !configBanner) {
        return false;
    }
    const elementFind = configBanner.keyFind
        ? get(element, configBanner.keyFind, null)
        : null;
    if (
        configBanner.minLengthBannersPrevious &&
        lengthBannersPrevious >= configBanner.minLengthBannersPrevious
    ) {
        return false;
    }

    if (configBanner.keyFind && elementFind == null) {
        return false;
    }

    if (
        configBanner.typeValue &&
        typeof configBanner.typeValue !== typeof elementFind
    ) {
        return false;
    }

    if (configBanner.minLength && elementFind.length < configBanner.minLength) {
        return false;
    }
    if (configBanner.maxLength && elementFind.length > configBanner.maxLength) {
        return false;
    }

    if (configBanner.value && configBanner.value !== elementFind) {
        return false;
    }

    return true;
};

export default equal;
