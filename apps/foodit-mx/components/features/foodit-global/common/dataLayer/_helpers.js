import removeAccents from '../../../../private/common/utils/removeAccents';

const RANDOM_SUFFIX_PATTERN = /-[a-z0-9]{6,}$/i;

export const TRANSLATE_LAYOUTS = {
    'Foodit-home': 'home',
    'Foodit-ficha-receta': 'recetas',
    'Foodit-recipe-paywall': 'receta_paywall',
    'Foodit-note-paywall': 'nota_paywall',
    'Foodit-ficha-nota': 'nota',
    'Foodit-chef': 'chefs_protagonistas',
    'Foodit-compras': 'lista_de_compras',
    'Foodit-recetario': 'recetario',
    'Foodit-menu-semanal': 'Mi_menu_semanal'
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

        pathname = pathname.replace(RANDOM_SUFFIX_PATTERN, '');

        return `${urlObj.protocol}//${urlObj.host}${pathname}`;
    } catch (error) {
        console.error('Error cleaning URL:', error);
        return url.split('?')[0].split('#')[0].replace(/\/$/, '');
    }
};

export const cleanSection = section => {
    if (!section) return '';
    return section.replace(RANDOM_SUFFIX_PATTERN, '');
};

export const processUriParams = (requestUri, siteUrl = '') => {
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

    const [rawFirstSection = '', rawSecondSection = '', rawThirdSection = ''] =
        sections || [];

    const firstSection = rawFirstSection;
    const secondSection = cleanSection(rawSecondSection);
    const thirdSection = rawThirdSection;

    const originalUrl = siteUrl ? `${siteUrl}${params}` : params;
    const cleanedUrl = cleanUrl(originalUrl);

    return {
        params,
        firstSection,
        secondSection,
        thirdSection,
        originalUrl,
        cleanedUrl,
        rawSections: {
            first: rawFirstSection,
            second: rawSecondSection,
            third: rawThirdSection
        }
    };
};

export const ejesMapping = {
    'aprende-en-la-cocina': {
        title: 'Aprendé en la cocina',
        contentType: 'aprende_en_la_cocina'
    },
    'cocina-facil-y-rapido': {
        title: 'Cociná fácil y rápido',
        contentType: 'cocina_facil_y_rapido'
    },
    'cocina-a-tu-medida': {
        title: 'Cociná a tu medida',
        contentType: 'cocina_a_tu_medida'
    },
    recetas: {
        title: 'Todas las recetas',
        contentType: 'recetas'
    }
};
