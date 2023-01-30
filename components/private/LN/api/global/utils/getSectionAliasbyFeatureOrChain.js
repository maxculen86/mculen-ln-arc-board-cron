const getSectionAliasbyFeatureOrChain = (nameContainer, typeContainer) => {
    const boxToSetSectionAliasMobile = {
        'LN-common/anexo': 'AnexoMobile',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-common/cajaAnticipo': 'Anticipo',
        'LN-acumulado/timeline': 'Timeline',
        'LN-common/LN10_anticipo': 'Anticipo',
        'LN-common/LN10_En_Vivo': 'EnVivo',
        LN10_Caja_Bomba: 'Bomba',
        LN10_Caja_Collection: {
            hashtag: 'default'
        }
    };

    const container = boxToSetSectionAliasMobile[nameContainer];
    if (container && typeof container === 'object') {
        return container[typeContainer] || null;
    }
    return container;
};

export default getSectionAliasbyFeatureOrChain;
