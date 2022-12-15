import get from '../get';

export const NOTICIA = '1';
export const INFOGRAFIA = '2';
export const STORYTELLING = '4';
export const VIDEO = '5';
export const LIVEBLOG = '6';
export const RECETA = '7';
export const FOTOAL100 = '8';
export const HTMLLIBRE = '9';
export const AGENCIA = '10';

export const Subtypes = [
    { id: '1', nombre: 'Noticia' },
    { id: '2', nombre: 'Infografia' },
    { id: '5', nombre: 'Video' },
    { id: '6', nombre: 'LiveBlog' },
    { id: '7', nombre: 'Receta' },
    { id: '4', nombre: 'Storytelling' },
    { id: '8', nombre: 'FotoAl100' },
    { id: '9', nombre: 'HtmlLibre' }
];

export const subtypesWithAmp = {
    '1': 'nota-noticia',
    '2': 'nota-infografia',
    '3': 'nota-opinion',
    '4': 'nota-storytelling',
    '5': 'nota-video',
    '6': 'nota-liveblog',
    '7': 'nota-receta',
    '8': 'nota-foto-al-100',
    '10': 'nota-agencia'
};

export const isSubtypeWithAmp = response => {
    const subtype = get(response, 'subtype', '');
    return response && subtype && !get(subtypesWithAmp, subtype, false);
};

export const isFotoAl100orStorytelling = subtype => {
    return subtype === FOTOAL100 || subtype === STORYTELLING;
};
