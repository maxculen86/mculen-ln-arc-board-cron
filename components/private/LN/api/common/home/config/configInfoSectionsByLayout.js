const infoLNMain = {
    'ln-common/cajaanticipo': { tipoSeccion: 'anticipo', idSeccion: 501 },
    'ln-common/bomba': { tipoSeccion: 'bomba', idSeccion: 102 },
    apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    'ln-common/anexomobile': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/anexo': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/opinion': { tipoSeccion: 'opinion', idSeccion: 1001 },
    'ln-common/editoriales': { tipoSeccion: 'opinion', idSeccion: 1001 },
    comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    banner: { tipoSeccion: 'banner' },
    dolar: {
        tipoSeccion: 'dolar',
        idSeccion: 2000,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/'
    },
    multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    'ln-acumulado/timeline': { tipoSeccion: 'tema', idSeccion: 3000 },
    'ln-common/ln10_en_vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

const infoLNMainLN10 = {
    'ln-common/ln10_anticipo': { tipoSeccion: 'anticipo', idSeccion: 501 },
    bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
    apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    'ln-common/anexo': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/anexomobile': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/opinion': { tipoSeccion: 'opinion', idSeccion: 1001 },
    'ln-common/editoriales': { tipoSeccion: 'opinion', idSeccion: 1001 },
    comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    banner: { tipoSeccion: 'banner' },
    dolar: {
        tipoSeccion: 'dolar',
        idSeccion: 2000,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/'
    },
    multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    'ln-acumulado/timeline': { tipoSeccion: 'tema', idSeccion: 3000 },
    'ln-common/ln10_en_vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    hashtag: { tipoSeccion: 'hashTag', idSeccion: 701 },
    'sub-exclusive': { tipoSeccion: 'suscriptor', idSeccion: 702 },
    propiedades: { tipoSeccion: 'suscriptor', idSeccion: 703 },
    campo: { tipoSeccion: 'suscriptor', idSeccion: 704 },
    bienestar: { tipoSeccion: 'bienestar', idSeccion: 705 },
    movilidad: { tipoSeccion: 'suscriptor', idSeccion: 706 },
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
