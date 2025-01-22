export const NOTICIA = '1';
export const INFOGRAFIA = '2';
export const STORYTELLING = '4';
export const VIDEO = '5';
export const LIVEBLOG = '6';
export const RECETA = '7';
export const RECETA_CERRADA = 'recipe-paywall';
export const FOTOAL100 = '8';
export const HTMLLIBRE = '9';
export const AGENCIA = '10';

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
    { id: '10', nombre: 'Agencia' }
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
        Agencia: AGENCIA
    };

    return dictionarySubtypes[subtype] || subtype;
};

export const isFotoAl100orStorytelling = subtype =>
    subtype === FOTOAL100 || subtype === STORYTELLING;
