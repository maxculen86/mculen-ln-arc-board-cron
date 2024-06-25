export const mockBenefits = [
    `Una colección de <span class"roboto-bold">recetas curadas</span> por expertos.`,
    'Todas las <span class"roboto-bold">tendencias alimentarias.</span>',
    '<span class"roboto-bold">Platos de autor</span> y <span>masterclasses</span> con cocineros referentes.',
    '<span class"roboto-bold">Guías de cocina</span> para principiantes.',
    '<span class"roboto-bold">Buscador</span> eficiente, <span>colecciones</span> personalizadas y más <span>funciones.</span>',
    '<span class"roboto-bold">Soluciones practicas</span> para cocinar todos los días.',
    '<span class"roboto-bold">Newsletter semanal</span> con ideas inspiradoras y novedades.'
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
