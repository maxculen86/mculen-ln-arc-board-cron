export const configSectionAliasbyFeatureOrChain = (
    nameContainer,
    typeContainer
) => {
    const boxToSetSectionAliasMobile = {
        'LN-common/anexo': 'Anexo',
        'LN-common/anexoMobile': 'AnexoMobile',
        'LN-common/cajaAnticipo': 'Anticipo',
        'LN-acumulado/timeline': 'Timeline',
        'LN-common/LN10_anticipo': 'Anticipo',
        'LN-common/LN10_En_Vivo': 'EnVivo',
        'LN-common/editoriales': 'Opinion',
        'LN-common/opinion': 'Opinion',
        LN10_Caja_Bomba: 'Bomba',
        LN10_Caja_Collection: {
            hashtag: 'HashTag'
        }
    };

    const container = boxToSetSectionAliasMobile[nameContainer];
    if (container && typeof container === 'object') {
        return container[typeContainer] || null;
    }
    return container;
};

export default configSectionAliasbyFeatureOrChain;
