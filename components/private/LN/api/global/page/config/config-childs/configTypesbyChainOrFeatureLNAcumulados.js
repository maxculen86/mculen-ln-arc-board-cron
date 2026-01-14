// Used in private/LN/api/v[1-9]/mobile/home/index.js
// This parameters are used for run the methods accord the type
// The type 1 is assign to Banner
export const configTypesbyChainOrFeature = sectionAliasMobile => {
    // 9: A type is set to discard the box
    const boxTypeContainer = {
        0: [
            'Ln_Caja_Manual',
            'Ln_Caja_Collection',
            'LN10_Caja_Bomba',
            'LN10_Caja_Manual',
            'LN10_Caja_Collection',
            'LN10_Caja_Canal',
            'LN10_Caja_Apertura',
            'LN-common/bomba',
            'LN-common/opinion',
            'LN-common/editoriales',
            'LN-acumulado/timeline',
            'LN-common/LN10_En_Vivo',
            'LN-acumulado/apertura'
        ],
        2: ['LN-common/anexo', 'LN-common/anexoMobile'],
        3: ['LN-common/LN10_anticipo', 'LN-common/cajaAnticipo'],
        9: [
            'LN-acumulado/ultimasNoticias',
            'LN-common/ranking',
            'LN-acumulado/grillaNotas',
            'LN-acumulado/tagList',
            'LN-common/bannerRefactor',
            'LN-acumulado/breadcrumb',
            'LN-acumulado/titulo',
            'LN-acumulado/anexoIframe'
        ],
        10: ['LN10_Caja_Carrusel', 'LN10_Caja_Carrusel_Horizontal'],
    };
    let defaultType = 9; // For discard box
    Object.keys(boxTypeContainer).some(typeIndexBox => {
        const elementsTypes = boxTypeContainer[typeIndexBox];
        if (
            sectionAliasMobile &&
            elementsTypes &&
            Array.isArray(elementsTypes) &&
            elementsTypes.some(
                typeComponent =>
                    typeComponent.toLowerCase() ===
                    sectionAliasMobile.toLowerCase()
            )
        ) {
            defaultType = typeIndexBox;
            return true;
        }
        return false;
    });
    return defaultType;
};

export default configTypesbyChainOrFeature;
