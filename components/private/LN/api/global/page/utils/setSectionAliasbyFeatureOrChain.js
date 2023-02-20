import { configSectionAliasByFeatureOrChain } from '../config/configSectionAliasByFeatureOrChain';

// this method is temporal for  keeping the old version
const findAliasSectionBySectionWeb = (sectionWeb, nameChain) => {
    let aliasSection = nameChain;
    Object.keys(configSectionAliasByFeatureOrChain).some(alias => {
        const configInSections = configSectionAliasByFeatureOrChain[alias];
        if (
            Array.isArray(configInSections) &&
            configInSections.includes(sectionWeb)
        ) {
            aliasSection = alias;
            return true;
        }
        return false;
    });
    return aliasSection;
};

const setSectionAliasbyFeatureOrChain = (
    information,
    sectionWeb,
    layoutPage
) => {
    if (information && information.nameFeature) {
        return information.nameFeature;
    }
    if (information && information.nameChain) {
        // console.log(sectionWeb);
        // console.log(information.typeChain);
        return information.typeChain
            ? information.typeChain
            : findAliasSectionBySectionWeb(sectionWeb, information.nameChain);
    }

    return sectionWeb;
};

export default setSectionAliasbyFeatureOrChain;
