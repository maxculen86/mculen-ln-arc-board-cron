// Used in private/LN/api/v[1-9]/mobile/home/index.js
// This parameters are used for run the methods accord the type
// The type 1 is assign to Banner
const configTypesbyChainOrFeature = nameContainer => {
    const boxTypeContainer = {
        Ln_Caja_Manual: 0,
        Ln_Caja_Collection: 0,
        LN10_Caja_Bomba: 0,
        LN10_Caja_Manual: 0,
        LN10_Caja_Collection: 0,
        LN10_Caja_Canal: 0,
        LN10_Caja_Apertura: 0,
        'LN-common/LN10_anticipo': 3,
        'LN-common/cajaAnticipo': 3,
        'LN-common/anexo': 2,
        'LN-common/bomba': 0,
        'LN-common/opinion': 0,
        'LN-common/editoriales': 0,
        'LN-common/anexoMobile': 2,
        'LN-acumulado/timeline': 0,
        'LN-common/bannerRefactor': 9,
        'LN-acumulado/breadcrumb': 9,
        'LN-acumulado/titulo': 9,
        'LN-acumulado/anexoIframe': 9,
        'LN-acumulado/apertura': 0,
        'LN-acumulado/tagList': 9,
        'LN-acumulado/grillaNotas': 9,
        'LN-common/ranking': 9,
        'LN-acumulado/ultimasNoticias': 9,
        'LN-common/LN10_En_Vivo': 0,
        default: 9 // A type is set to discard
    };

    return boxTypeContainer[nameContainer] == null
        ? boxTypeContainer.default
        : boxTypeContainer[nameContainer];
};

export default configTypesbyChainOrFeature;
