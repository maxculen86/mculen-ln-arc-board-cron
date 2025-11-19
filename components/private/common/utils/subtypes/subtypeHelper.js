export const NOTICIA = '1';
export const INFOGRAFIA = '2';
export const STORYTELLING = '4';
export const NOTA_CERRADA = 'note-paywall';
export const VIDEO = '5';
export const LIVEBLOG = '6';
export const RECETA = '7';
export const RECETA_CERRADA = 'recipe-paywall';
export const FOTOAL100 = '8';
export const HTMLLIBRE = '9';
export const AGENCIA = '10';
export const LIVEBLOG_EDITORIAL = '11';
export const VIDEOAL100 = '12';
export const HOWTO = '13';
export const CARDS = '14';
export const HTMLLIBRECLL = '15';
export const VIDEO_VERTICAL = '16';

export const SUSCRIPTOR_SECTION = 'la-nacion-cerca';

export const Subtypes = [
    { id: '1', nombre: 'Noticia' },
    { id: '2', nombre: 'Infografia' },
    { id: '5', nombre: 'Video' },
    { id: '6', nombre: 'LiveBlog' },
    { id: '7', nombre: 'Receta' },
    { id: '4', nombre: 'Storytelling' },
    { id: '8', nombre: 'FotoAl100' },
    { id: '9', nombre: 'HtmlLibre' },
    { id: '10', nombre: 'Agencia' },
    { id: '11', nombre: 'Liveblog-Editorial' },
    { id: '12', nombre: 'VideoAl100' },
    { id: '13', nombre: 'HowTo' },
    { id: '14', nombre: 'Cards' },
    { id: '15', nombre: 'HtmlLibre canchallena' },
    { id: '16', nombre: 'Video Vertical' }
];

export const translateStringFromSubitypeToID = (subtype = '') => {
    const dictionarySubtypes = {
        Noticia: NOTICIA,
        Infografia: INFOGRAFIA,
        Video: VIDEO,
        LiveBlog: LIVEBLOG,
        Receta: RECETA,
        Storytelling: STORYTELLING,
        FotoAl100: FOTOAL100,
        HtmlLibre: HTMLLIBRE,
        Agencia: AGENCIA,
        LiveblogEditorial: LIVEBLOG_EDITORIAL,
        VideoAl100: VIDEOAL100,
        HowTo: HOWTO,
        Cards: CARDS,
        'HtmlLibre canchallena': HTMLLIBRECLL,
        VideoVertical: VIDEO_VERTICAL
    };

    return dictionarySubtypes[subtype] || subtype;
};

export const isFotoAl100orStorytelling = subtype =>
    subtype === FOTOAL100 || subtype === STORYTELLING;

const EXCLUDED_PRELOAD_SUBTYPES = [CARDS];

export const shouldPreloadForSubtype = subtype =>
    !subtype || !EXCLUDED_PRELOAD_SUBTYPES.includes(String(subtype));
