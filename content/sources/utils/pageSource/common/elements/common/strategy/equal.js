import get from '../../../../../../../../components/private/common/utils/get';

export const equal = (element, configElement, lengthBannersPrevious) => {
    if (!element || !configElement) {
        return false;
    }
    const elementFind = configElement.keyFind
        ? get(element, configElement.keyFind, null)
        : null;
    if (
        configElement.minLengthElementsPrevious &&
        lengthBannersPrevious >= configElement.minLengthElementsPrevious
    ) {
        return false;
    }

    if (configElement.keyFind && elementFind == null) {
        return false;
    }

    if (
        configElement.typeValue &&
        typeof configElement.typeValue !== typeof elementFind
    ) {
        return false;
    }

    if (
        configElement.minLength &&
        elementFind.length < configElement.minLength
    ) {
        return false;
    }
    if (
        configElement.maxLength &&
        elementFind.length > configElement.maxLength
    ) {
        return false;
    }

    return !(configElement.value && configElement.value !== elementFind);
};

export default equal;
