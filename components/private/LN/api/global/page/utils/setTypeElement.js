import configsTypesByLayout from '../config/configTypesByLayout';

const setTypeElement = (information, sectionAliasMobile, layoutPage) => {
    /*     if (information && (information.nameChain || information.nameFeature)) {
        const elementContainer =
            information.nameFeature == null
                ? information.nameChain
                : information.nameFeature;
        return configsTypesByLayout(layoutPage)(elementContainer);
    } */
    return Number(configsTypesByLayout(layoutPage)(sectionAliasMobile));
    // By default set a number for discard element
    // return 9;
};

export default setTypeElement;
