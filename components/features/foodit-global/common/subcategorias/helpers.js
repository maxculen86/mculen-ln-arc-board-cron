const createMockItem = ({
    title,
    href,
    trackingLabel,
    src = '',
    container = 'media',
    classNames = ''
}) => ({
    title,
    imageProps: { src, alt: `Imagen de ${title}` },
    linkProps: { href, title: `Ir a ${title}` },
    container,
    trackingLabel,
    ...(classNames && { classNames })
});
const aprendeEnCocinaClassName = 'min-h-134 min-h-120_lg';
const cocinaRecetaClassName =
    'min-h-134 min-h-max_md min-h-120_lg col-span-4_md';
const cocinaFacilClassName = 'min-h-113 min-h-120_md';

const aprendeEnCocinaMock = [
    createMockItem({
        title: 'Tutoriales de cocina salada',
        href: '/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutorial%20Cocina%20Salada&groups=occasions&itemGroups=Tutorial%20Cocina%20Salada',
        trackingLabel: 'tutoriales_de_cocina_salada',
        src: 'tutoriales-salada.webp',
        classNames: aprendeEnCocinaClassName
    }),
    createMockItem({
        title: 'Tutoriales de pastelería',
        href: '/tema/tutorial-pasteler%C3%ADa-qat7qtvzy5dmzd6opl4ap2d2se/?query=recetas&title=Tutorial%20Pasteler%C3%ADa&groups=occasions&itemGroups=Tutorial%20Pasteler%C3%ADa',
        trackingLabel: 'tutoriales_de_pasteleria',
        src: 'tutoriales-pasteleria.webp',
        classNames: aprendeEnCocinaClassName
    }),
    createMockItem({
        title: 'Masterclass de chef',
        href: '/masterclass/',
        trackingLabel: 'masterclass_de_chef',
        src: 'masterclass.webp',
        classNames: aprendeEnCocinaClassName
    }),
    createMockItem({
        title: 'Guías de cocina',
        href: '/guias-de-cocina/',
        trackingLabel: 'guias_de_cocina',
        src: 'guias.webp',
        classNames: aprendeEnCocinaClassName
    }),
    createMockItem({
        title: 'Recomendaciones del chef',
        href: '/chefs/',
        trackingLabel: 'recomendaciones_del_chef',
        src: 'recomendaciones-chef.webp',
        classNames: 'min-h-120',
        container: 'double'
    }),
    createMockItem({
        title: 'Trucos y secretos',
        href: '/trucos/',
        trackingLabel: 'trucos_y_secretos',
        src: 'trucos-y-secretos.webp',
        classNames: aprendeEnCocinaClassName
    }),
    createMockItem({
        title: 'Protocolo en la mesa',
        href: '/protocolo/',
        trackingLabel: 'protocolo_en_la_mesa',
        src: 'protocolo.webp',
        classNames: aprendeEnCocinaClassName
    })
];

const cocinaFacilMock = [
    createMockItem({
        title: 'Meal prep',
        href: '/recetas/que-cocinar-hoy/meal-prep/',
        trackingLabel: 'meal_prep',
        container: 'double',
        src: 'mealprep.webp',
        classNames: 'min-h-120'
    }),
    createMockItem({
        title: 'Recetas fáciles',
        href: '/recetas/que-cocinar-hoy/facil/',
        trackingLabel: 'recetas_faciles',
        src: 'recetas-faciles.webp',
        classNames: cocinaFacilClassName
    }),
    createMockItem({
        title: 'Recetas rápidas',
        href: '/recetas/que-cocinar-hoy/rapida/',
        trackingLabel: 'recetas_rapidas',
        src: 'recetas-rapidas.webp',
        classNames: cocinaFacilClassName
    })
];
const cocinaAMedidaMock = [
    createMockItem({
        title: 'Menú semanal',
        href: '/menu-semanal/',
        trackingLabel: 'menu_semanal',
        src: 'menu-semanal.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Ingredientes de cocina',
        href: '/ingredientes/',
        trackingLabel: 'ingredientes_de_cocina',
        src: 'ingredientes-cocina.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Vegetariana',
        href: '/recetas/dieta/vegetariana/',
        trackingLabel: 'recetas_vegetariana',
        src: 'vegetariana.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Sin gluten',
        href: '/recetas/dieta/sin-gluten/',
        trackingLabel: 'recetas_sin_gluten',
        src: 'sin-gluten.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Keto',
        href: '/recetas/dieta/keto/',
        trackingLabel: 'recetas_keto',
        src: 'keto.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Sin lactosa',
        href: '/recetas/dieta/sin-lactosa/',
        trackingLabel: 'recetas_sin_lactosa',
        src: 'sin-lactosa.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Vegana',
        href: '/recetas/dieta/vegana/',
        trackingLabel: 'recetas_vegana',
        src: 'vegana.webp',
        classNames: cocinaRecetaClassName
    }),
    createMockItem({
        title: 'Saludable',
        href: '/recetas/que-cocinar-hoy/saludable/',
        trackingLabel: 'recetas_saludable',
        src: 'saludable.webp',
        classNames: cocinaRecetaClassName
    })
];
const recetasMock = [
    createMockItem({
        title: 'Saladas',
        href: '/recetas/saladas/',
        trackingLabel: 'saladas',
        classNames: cocinaRecetaClassName,
        src: 'saladas.webp'
    }),
    createMockItem({
        title: 'Dulces',
        href: '/recetas/dulces/',
        trackingLabel: 'dulces',
        classNames: cocinaRecetaClassName,
        src: 'dulces.webp'
    }),
    createMockItem({
        title: 'De autor',
        href: '/recetas/que-cocinar-hoy/de-autor/',
        trackingLabel: 'de_autor',
        classNames: cocinaRecetaClassName,
        src: 'autor.webp'
    }),
    createMockItem({
        title: 'Bebidas',
        href: '/recetas/bebidas/',
        trackingLabel: 'bebidas',
        classNames: cocinaRecetaClassName,
        src: 'bebidas.webp'
    }),
    createMockItem({
        title: 'Tendencias en la cocina',
        href: '/tendencias/',
        trackingLabel: 'tendencias-en-la-cocina',
        classNames: cocinaRecetaClassName,
        src: 'tendencias-cocina.webp'
    }),
    createMockItem({
        title: 'Chefs protagonistas',
        href: '/chefs-protagonistas/',
        trackingLabel: 'chefs-protagonistas',
        classNames: cocinaRecetaClassName,
        src: 'chefs-protagonistas.webp'
    })
];
const subcategoryKeywords = {
    'aprende-en-la-cocina': aprendeEnCocinaMock,
    'cocina-facil': cocinaFacilMock,
    'cocina-a-tu-medida': cocinaAMedidaMock,
    receta: recetasMock
};

export const getMockBySubcategory = (subcategoryUrl = '') => {
    const cleanUrl = subcategoryUrl.split('?')[0].toLowerCase();
    const keyword = Object.keys(subcategoryKeywords).find(key =>
        cleanUrl.includes(key)
    );
    return subcategoryKeywords[keyword] || [];
};
export { aprendeEnCocinaMock, cocinaFacilMock, cocinaAMedidaMock, recetasMock };
