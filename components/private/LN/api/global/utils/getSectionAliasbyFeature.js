const getSectionAliasbyFeature = nameContainer => {
    const boxToSetSectionAliasMobile = {
        'LN-common/anexo': 'AnexoMobile',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-common/cajaAnticipo': 'Anticipo',
        'LN-acumulado/timeline': 'Timeline',
        'LN-common/LN10_anticipo': 'Anticipo',
        'LN-common/LN10_En_Vivo': 'EnVivo'
    };

    return boxToSetSectionAliasMobile[nameContainer];
};

export default getSectionAliasbyFeature;
