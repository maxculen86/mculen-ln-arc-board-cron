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
        return information.typeChain ? information.typeChain : sectionWeb;
    }

    return sectionWeb;
};

export default setSectionAliasbyFeatureOrChain;
