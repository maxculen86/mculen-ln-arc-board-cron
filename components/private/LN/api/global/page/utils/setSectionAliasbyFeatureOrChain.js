import configSectionAliasbyLayout from '../config/configSectionAliasbyLayout';

const setSectionAliasbyFeatureOrChain = (
    information,
    sectionMobile,
    layoutPage
) => {
    if (information && (information.nameFeature || information.nameChain)) {
        const sectionAliasbyFeature = configSectionAliasbyLayout(layoutPage)(
            information.nameFeature == null
                ? information.nameChain
                : information.nameFeature,
            information.typeChain
        );
        return sectionAliasbyFeature == null
            ? sectionMobile
            : sectionAliasbyFeature;
    }
    return sectionMobile;
};

export default setSectionAliasbyFeatureOrChain;
