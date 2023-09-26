import get from '../../../../../../../../components/private/common/utils/get';

export const notequal = (element, configElement, lengthBannersPrevious) => {
    if (!element || !configElement) {
        return false;
    }
    const elementFind = configElement.keyFind
        ? get(element, configElement.keyFind, null)
        : null;

    if (
        configElement.minLengthElementsPrevious &&
        configElement.minLengthElementsPrevious >= lengthBannersPrevious
    ) {
        return false;
    }
    if (configElement.keyFind && elementFind == null) {
        return true;
    }

    if (
        configElement.typeValue &&
        typeof configElement.typeValue === typeof elementFind
    ) {
        return false;
    }

    if (
        configElement.minLength &&
        configElement.minLength <= elementFind.length
    ) {
        return false;
    }
    if (
        configElement.maxLength &&
        configElement.maxLength >= elementFind.length
    ) {
        return false;
    }

    if (configElement.value && configElement.value === elementFind) {
        return false;
    }

    return true;
};

export default notequal;
