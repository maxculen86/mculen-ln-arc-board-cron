const getSectionAliasbyFeature = nameContainer => {
    const boxToSetSectionAliasMobile = {
        'LN-common/anexo': 'AnexoMobile',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-common/cajaAnticipo': 'Anticipo',
        'LN-acumulado/timeline': 'Timeline'
    };

    return boxToSetSectionAliasMobile[nameContainer];
};

export default getSectionAliasbyFeature;
