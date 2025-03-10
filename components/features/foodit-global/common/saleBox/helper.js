export const mockBenefits = [
    '<span class="roboto-bold">Recetas y menús para todos:</span> Planes semanales y miles de opciones fáciles y ricas en un solo lugar.',
    '<span class="roboto-bold">Cociná sin complicaciones:</span> Guardá recetas generá lista de compras y ahorrá tiempo.',
    '<span class="roboto-bold">Más beneficios para vos:</span> Elegí Foodit solo o con Club LA NACION y accedé a beneficios en supermercado, deco, hogar y mucho más.'
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
