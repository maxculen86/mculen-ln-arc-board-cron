const getSectionAliasbyFeature = nameContainer => {
    const boxTypeContainer = {
        'LN-common/anexo': 'AnexoMobile',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-acumulado/timeline': 'Timeline'
    };

    return boxTypeContainer[nameContainer];
};

export default getSectionAliasbyFeature;
