import configSectionAliasbyFeatureOrChain from '../config/configSectionAliasbyFeatureOrChain';

const setSectionAliasbyFeatureOrChain = (information, sectionMobile) => {
    if (information && (information.nameFeature || information.nameChain)) {
        const sectionAliasbyFeature = configSectionAliasbyFeatureOrChain(
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
