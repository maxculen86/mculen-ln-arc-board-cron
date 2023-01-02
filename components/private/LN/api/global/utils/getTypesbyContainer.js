const getTypesbyContainer = nameContainer => {
    const boxTypeContainer = {
        Ln_Caja_Manual: 0,
        Ln_Caja_Collection: 0,
        'LN-common/cajaAnticipo': 0,
        'LN-common/anexo': 2,
        'LN-common/bomba': 0,
        'LN-common/opinion': 0,
        'LN-common/editoriales': 0,
        'LN-common/anexoMobile': 2,
        'LN-acumulado/timeline': 0,
        'LN-common/bannerRefactor': 0,
        'LN-acumulado/breadcrumb': 0,
        'LN-acumulado/titulo': 0,
        'LN-acumulado/anexoIframe': 0,
        'LN-acumulado/apertura': 0,
        'LN-acumulado/tagList': 0,
        'LN-acumulado/grillaNotas': 3,
        'LN-common/ranking': 0,
        'LN-acumulado/ultimasNoticias': 3,
        default: 9 // A type is set to discard
    };

    return boxTypeContainer[nameContainer] == null
        ? boxTypeContainer.default
        : boxTypeContainer[nameContainer];
};

export default getTypesbyContainer;
