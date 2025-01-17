export const mockBenefits = [
    '<span class="roboto-bold">Empezá a comer mejor</span> con nuestros menús semanales creados por nutricionistas.',
    '<span class="roboto-bold">Ahorrá tiempo</span> con una gran variedad de recetas fáciles, rápidas, y ricas. Todo en un solo lugar.',
    '<span class="roboto-bold">Dejá de cocinar siempre lo mismo.</span> Usá Foodit para conocer nuevos platos y sabores.',
    '<span class="roboto-bold">Sin complicaciones.</span> Recetas probadas con información clara y simple. Armá tu recetario y listas de compras de ingredientes.',
    '<span class="roboto-bold">Trucos y secretos.</span> Aprendé con nuestras masterclasses, guías de cocina y notas sobre técnicas, ingredientes y consejos prácticos.',
    'Con la suscripción de Foodit + Club LA NACION accedé a cientos de descuentos y beneficios y <span class="roboto-bold">ahorrá más de lo que cuesta la suscripción.</span>'
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
