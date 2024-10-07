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
