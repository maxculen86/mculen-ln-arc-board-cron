export const mockBenefits = [
    `Una colección de <strong>recetas curadas</strong> por expertos.`,
    'Todas las <strong>tendencias alimentarias.</strong>',
    '<strong>Platos de autor</strong> y <strong>masterclasses</strong> con cocineros referentes.',
    '<strong>Guías de cocina</strong> para principiantes.',
    '<strong>Buscador</strong> eficiente, <strong>colecciones</strong> personalizadas y más <strong>funciones.</strong>',
    '<strong>Soluciones practicas</strong> para cocinar todos los días.',
    '<strong>Newsletter semanal</strong> con ideas inspiradoras y novedades.'
];

export const imgsPhoneFoodit = assetsPath => [
    {
        srcSet: assetsPath('phone-foodit-mobile.webp')
    },
    {
        srcSet: assetsPath('phone-foodit-tablet.webp'),
        minWidth: 768
    },
    {
        srcSet: assetsPath('phone-foodit-desktop.webp'),
        minWidth: 1280
    }
];

export const imgsIngredientsBackground = [
    {
        asset: 'ingredient-background-left-top.webp',
        className: 'top-0 left-0 absolute'
    },
    {
        asset: 'ingredient-background-right-top.webp',
        className: 'top-0 right-0 absolute'
    },
    {
        asset: 'ingredient-background-middle-bottom.webp',
        className: 'bottom-0 left-50 absolute'
    }
];
