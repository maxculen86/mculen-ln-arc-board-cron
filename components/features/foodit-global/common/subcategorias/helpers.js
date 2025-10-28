import subcategoryKeywords from '../../../../../__mocks__/data/fooditCategories/subcategoryKeywords.json';

export const createMockItem = ({
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

export const getMockBySubcategory = (subcategoryUrl = '') => {
    const cleanUrl = subcategoryUrl.split('?')[0].toLowerCase();
    const keyword = Object.keys(subcategoryKeywords).find(key =>
        cleanUrl.includes(key)
    );
    return keyword
        ? subcategoryKeywords[keyword].map(item => createMockItem(item))
        : [];
};

export const aprendeEnCocinaMock = subcategoryKeywords[
    'aprende-en-la-cocina'
].map(item => createMockItem(item));

export const cocinaFacilMock = subcategoryKeywords['cocina-facil'].map(item =>
    createMockItem(item)
);

export const cocinaAMedidaMock = subcategoryKeywords['cocina-a-tu-medida'].map(
    item => createMockItem(item)
);

export const recetasMock = subcategoryKeywords.receta.map(item =>
    createMockItem(item)
);

export const ejesHomeMock =
    subcategoryKeywords['ejes-home'].map(createMockItem);
