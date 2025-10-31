export const mockBenefits = [
    '<span class="roboto-bold">Variedad que se adapta a vos:</span> Recetas y opciones para cada estilo de alimentación.',
    '<span class="roboto-bold">Inspiración todos los días:</span> Ideas fáciles y ricas para cocinar.',
    '<span class="roboto-bold">Resolvé las comidas de la semana:</span> Recetas fáciles, rápidas y menús semanales creados por nutricionistas.',
    '<span class="roboto-bold">Aprendé y mejorá en la cocina:</span> Aprendé y mejorá en la cocina con tutoriales en video, guías y masterclasses de grandes chefs.'
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
        className: 'top-0 left-0 w-40 absolute'
    },
    {
        asset: 'ingredient-background-right-top.webp',
        className: 'top-0 right-0 w-136 absolute'
    },
    {
        asset: 'ingredient-background-middle-bottom.webp',
        className: 'bottom-0 left-50 absolute'
    }
];
