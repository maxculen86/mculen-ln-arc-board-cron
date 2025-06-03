import { SITE_FOODIT } from 'fusion:environment';
import removeAccents from '../../../../private/common/utils/removeAccents';

export const TRANSLATE_LAYOUTS = {
    'Foodit-home': 'home',
    'Foodit-ficha-receta': 'recetas',
    'Foodit-recipe-paywall': 'receta_paywall',
    'Foodit-ficha-nota': 'nota',
    'Foodit-chef': 'chefs_protagonistas',
    'Foodit-compras': 'lista_de_compras',
    'Foodit-recetario': 'recetario'
};

export const DESCUBRIR_SECTIONS = [
    'nutricion',
    'restaurantes',
    'chefs_protagonistas',
    'novedades_y_tendencias'
];

export const transformDataLayerString = (text = '') =>
    removeAccents(text).replace(/ /g, '_').toLowerCase();

export const dataLayerDictionary = {
    note: 'nota',
    recipe: 'receta'
};

export const dataLayerLayoutDictionary = {
    'Foodit-home': 'home',
    'Foodit-acumulado': 'acumulados',
    'Foodit-ficha-receta': 'ficha_receta',
    'Foodit-ficha-nota': 'ficha_nota',
    'Foodit-buscador': 'buscador'
};

export const dataLayerContainerDictionary = {
    'Foodit-ficha-nota': 'recomendaciones',
    'Foodit-ficha-receta': 'recomendaciones'
};

export const cleanUrl = url => {
    if (!url) return '';

    try {
        const urlObj = new URL(url);
        let pathname = urlObj.pathname.replace(/\/$/, '');

        pathname = pathname.replace(/-[a-z0-9]{6,}$/i, '');

        return `${urlObj.protocol}//${urlObj.host}${pathname}`;
    } catch (error) {
        return url.split('?')[0].split('#')[0].replace(/\/$/, '');
    }
};

export const processUriParams = requestUri => {
    if (!requestUri) {
        return {
            params: '',
            firstSection: '',
            secondSection: '',
            thirdSection: '',
            originalUrl: '',
            cleanedUrl: ''
        };
    }

    const params = requestUri.split('?')[0];

    const sections =
        params &&
        removeAccents(params)
            .replace(/^\/|\/$/g, '')
            .split('/')
            .filter(Boolean);

    const [firstSection = '', secondSection = '', thirdSection = ''] =
        sections || [];

    const originalUrl = `${SITE_FOODIT}${params}`;
    const cleanedUrl = cleanUrl(originalUrl);

    return {
        params,
        firstSection,
        secondSection,
        thirdSection,
        originalUrl,
        cleanedUrl
    };
};
