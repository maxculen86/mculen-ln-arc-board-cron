const createMockItem = ({
    title,
    href,
    trackingLabel,
    src = '',
    container = 'media',
    classNames = 'min-h-134 min-h-120_lg'
}) => ({
    title,
    imageProps: { src, alt: `Imagen de ${title}` },
    linkProps: { href, title: `Ir a ${title}` },
    container,
    trackingLabel,
    classNames
});

export const currentMock = [
    createMockItem({
        title: 'Aprendé en la cocina',
        href: '/aprende-en-la-cocina/',
        trackingLabel: 'aprende_a_cocinar',
        src: 'aprende.webp'
    }),
    createMockItem({
        title: 'Cociná fácil y rápido',
        href: '/cocina-facil-y-rapido/',
        trackingLabel: 'cocina_facil',
        src: 'cocina-a-tu-medida.webp'
    }),
    createMockItem({
        title: 'Cociná a tu medida',
        href: '/cocina-a-tu-medida/',
        trackingLabel: 'cocina_a_tu_manera',
        src: 'cocina-facil.webp'
    }),
    createMockItem({
        title: 'Todas las recetas',
        href: '/subcategoria-receta/',
        trackingLabel: 'recetas',
        src: 'recetas.webp'
    })
];
