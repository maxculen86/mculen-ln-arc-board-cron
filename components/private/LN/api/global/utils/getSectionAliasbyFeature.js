const getSectionAliasbyFeature = nameContainer => {
    const boxTypeContainer = {
        'LN-common/anexo': 'Anexo',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-acumulado/timeline': 'Timeline'
    };

    return boxTypeContainer[nameContainer];
};

export default getSectionAliasbyFeature;
