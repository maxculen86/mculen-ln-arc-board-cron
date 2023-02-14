import configTypesbyChainOrFeature from '../config/configTypesbyChainOrFeature';

const setTypeElement = information => {
    if (information && (information.nameChain || information.nameFeature)) {
        const elementContainer =
            information.nameFeature == null
                ? information.nameChain
                : information.nameFeature;
        return configTypesbyChainOrFeature(elementContainer);
    }
    // By default set a number for discard element
    return 9;
};

export default setTypeElement;
