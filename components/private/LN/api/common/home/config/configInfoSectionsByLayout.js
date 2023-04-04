export const infoLNMain = {
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
    'ln-acumulado/timeline': { tipoSeccion: 'apertura', idSeccion: 3000 },
    'ln-common/ln10_en_vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

export const infoLNMainLN10 = {
    'ln-common/ln10_anticipo': { tipoSeccion: 'anticipo', idSeccion: 501 },
    bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
    bombita: { tipoSeccion: 'bombita', idSeccion: 102 },
    apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    'ln-common/anexo': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/anexomobile': { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    'ln-common/ln10_opinion': { tipoSeccion: 'opinion', idSeccion: 1001 },
    'ln-common/ln10_editorial': { tipoSeccion: 'editorial', idSeccion: 1001 },
    contentlab: { tipoSeccion: 'contentlab', idSeccion: 1101 },
    afondo: { tipoSeccion: 'afondo', idSeccion: 1101 },
    banner: { tipoSeccion: 'banner' },
    dolar: { tipoSeccion: 'dolar', idSeccion: 2000 },
    multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    'ln-10/timeline': { tipoSeccion: 'timeline', idSeccion: 703 },
    'ln-common/ln10_en_vivo': { tipoSeccion: 'enVivo', idSeccion: 700 },
    hashtag: { tipoSeccion: 'hashTag', idSeccion: 305 },
    'sub-exclusive': { tipoSeccion: 'suscriptor', idSeccion: 305 },
    propiedades: { tipoSeccion: 'propiedades', idSeccion: 305 },
    campo: { tipoSeccion: 'campo', idSeccion: 305 },
    bienestar: { tipoSeccion: 'bienestar', idSeccion: 305 },
    movilidad: { tipoSeccion: 'movilidad', idSeccion: 305 },
    default: { tipoSeccion: 'tema', idSeccion: 305 },
    welfare: { tipoSeccion: 'bienestar', idSeccion: 305 },
    title: { tipoSeccion: 'title', idSeccion: 704 }
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
