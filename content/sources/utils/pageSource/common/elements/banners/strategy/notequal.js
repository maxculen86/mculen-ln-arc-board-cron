import get from '../../../../../../../../components/private/common/utils/get';

export const notequal = (element, configBanner, lengthBannersPrevious) => {
    if (!element || !configBanner) {
        return false;
    }
    const elementFind = configBanner.keyFind
        ? get(element, configBanner.keyFind, null)
        : null;

    if (
        configBanner.minLengthBannersPrevious &&
        configBanner.minLengthBannersPrevious >= lengthBannersPrevious
    ) {
        return false;
    }
    if (configBanner.keyFind && elementFind == null) {
        return true;
    }

    if (
        configBanner.typeValue &&
        typeof configBanner.typeValue === typeof elementFind
    ) {
        return false;
    }

    if (
        configBanner.minLength &&
        configBanner.minLength <= elementFind.length
    ) {
        return false;
    }
    if (
        configBanner.maxLength &&
        configBanner.maxLength >= elementFind.length
    ) {
        return false;
    }

    if (configBanner.value && configBanner.value === elementFind) {
        return false;
    }

    return true;
};

export default notequal;
