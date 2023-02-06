// Sirve para agregar información a la sección o caja desde el campo sectionAliasMobile establecido en page/index.js
const getTypeSection = nameContainer => {
    const typeSection = {
        Anticipo: { tipoSeccion: 'anticipo', idSeccion: 501 },
        Bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
        Apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
        Anexo: { tipoSeccion: 'anexo', idSeccion: 0 },
        AnexoMobile: { tipoSeccion: 'anexoMobile', idSeccion: 603 },
        Opinion: { tipoSeccion: 'opinion', idSeccion: 1001 },
        Comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
        Banner: { tipoSeccion: 'banner' },
        Dolar: {
            tipoSeccion: 'dolar',
            idSeccion: 2000,
            tituloCaja: 'Cotización hoy',
            url: 'https://www.lanacion.com.ar/economia/dolar/'
        },
        Multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
        Timeline: { tipoSeccion: 'tema', idSeccion: 3000 },
        Aside: { tipoSeccion: 'aside', idSeccion: 306 },
        EnVivo: { tipoSeccion: 'enVivo', idSeccion: 700 },
        HashTag: { tipoSeccion: 'hashTag', idSeccion: 701 },
        Suscriptor: { tipoSeccion: 'suscriptor', idSeccion: 702 },
        default: { tipoSeccion: 'tema', idSeccion: 305 }
    };
    return typeSection;
};

export default getTypeSection;
