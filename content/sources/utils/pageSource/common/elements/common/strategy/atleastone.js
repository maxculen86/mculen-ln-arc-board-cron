import { equal } from './equal';

export const atleastone = (element, configElement, lengthBannersPrevious) => {
    if (!element || !configElement) {
        return false;
    }

    return (
        configElement &&
        Array.isArray(configElement.conditions) &&
        configElement.conditions.some(config => {
            const configElementNew = {
                ...config,
                keyFind: configElement.keyFind
            };
            return equal(element, configElementNew, lengthBannersPrevious);
        })
    );
};

export default atleastone;
