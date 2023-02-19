const infoLNMain = {
    'LN-common/cajaAnticipo': { tipoSeccion: 'anticipo', idSeccion: 501 },
    'LN-common/bomba': { tipoSeccion: 'bomba', idSeccion: 102 },
    Apertura_1: { tipoSeccion: 'apertura', idSeccion: 200 },
    Apertura_2: { tipoSeccion: 'apertura', idSeccion: 200 },
    'LN-common/anexoMobile': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'LN-common/anexo': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'LN-common/opinion': { tipoSeccion: 'opinion', idSeccion: 1001 },
    'LN-common/editoriales': { tipoSeccion: 'opinion', idSeccion: 1001 },
    Comercial_1: { tipoSeccion: 'comercial', idSeccion: 1101 },
    Banner: { tipoSeccion: 'banner' },
    Dolar: {
        tipoSeccion: 'dolar',
        idSeccion: 2000,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/'
    },
    Multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    'LN-acumulado/timeline': { tipoSeccion: 'tema', idSeccion: 3000 },
    'LN-common/LN10_En_Vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

const infoLNMainLN10 = {
    'LN-common/LN10_anticipo': { tipoSeccion: 'anticipo', idSeccion: 501 },
    bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
    apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    'LN-common/anexo': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'LN-common/anexoMobile': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'LN-common/opinion': { tipoSeccion: 'opinion', idSeccion: 1001 },
    'LN-common/editoriales': { tipoSeccion: 'opinion', idSeccion: 1001 },
    comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    Banner: { tipoSeccion: 'banner' },
    Dolar: {
        tipoSeccion: 'dolar',
        idSeccion: 2000,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/'
    },
    multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    'LN-acumulado/timeline': { tipoSeccion: 'tema', idSeccion: 3000 },
    'LN-common/LN10_En_Vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    hashTag: { tipoSeccion: 'hashTag', idSeccion: 701 },
    suscriptor: { tipoSeccion: 'suscriptor', idSeccion: 702 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

const configInfoSectionsByLayout = layout => {
    const boxInformationSections = {
        'LN-acumulado': infoLNMain,
        'LN-Home_Main': infoLNMain,
        'LN-Home_Sports': infoLNMain,
        'LN10-Home_Main': infoLNMainLN10
    };

    return boxInformationSections[layout];
};

export default configInfoSectionsByLayout;
