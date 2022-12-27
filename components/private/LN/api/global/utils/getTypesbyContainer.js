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
        'LN-acumulado/grillaNotas': 0,
        'LN-common/ranking': 0,
        'LN-acumulado/ultimasNoticias': 0,
        default: 0
    };

    return boxTypeContainer[nameContainer];
};

export default getTypesbyContainer;
