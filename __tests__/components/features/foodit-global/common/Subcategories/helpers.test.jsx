import {
    aprendeEnCocinaMock,
    cocinaAMedidaMock,
    cocinaFacilMock,
    getMockBySubcategory,
    recetasMock
} from '../../../../../../components/features/foodit-global/common/subcategorias/helpers';
import {
    trackHomeCard,
    trackSubcategoryCard
} from '../../../../../../components/layouts/Foodit-subcategorias/_helpers';
import { createMockItem } from '../../../../../../components/features/foodit-global/common/subcategorias/helpers';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Mocks & factory', () => {
    it('aprendeEnCocinaMock have 7 items', () => {
        expect(aprendeEnCocinaMock).toHaveLength(7);
    });

    it.each([
        [
            'Tutoriales de cocina salada',
            '/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutorial%20Cocina%20Salada&groups=occasions&itemGroups=Tutorial%20Cocina%20Salada'
        ],
        [
            'Tutoriales de pastelería',
            '/tema/tutorial-pasteler%C3%ADa-qat7qtvzy5dmzd6opl4ap2d2se/?query=recetas&title=Tutorial%20Pasteler%C3%ADa&groups=occasions&itemGroups=Tutorial%20Pasteler%C3%ADa'
        ],
        ['Masterclass de chef', '/masterclass/'],
        ['Guías de cocina', '/guias-de-cocina/'],
        ['Recomendaciones del chef', '/chefs/'],
        ['Trucos y secretos', '/trucos/'],
        ['Protocolo en la mesa', '/protocolo/']
    ])('la ruta de "%s" es "%s"', (title, expectedHref) => {
        const item = aprendeEnCocinaMock.find(i => i.title === title);
        expect(item).toBeTruthy();
        expect(item.linkProps.href).toBe(expectedHref);
    });

    it('cocinaFacilMock have 3 items', () => {
        expect(cocinaFacilMock).toHaveLength(3);
    });

    it.each([
        ['Mealprep', '/recetas/que-cocinar-hoy/meal-prep/'],
        ['Recetas fáciles', '/recetas/que-cocinar-hoy/facil/'],
        ['Recetas rápidas', '/recetas/que-cocinar-hoy/rapida/']
    ])('la ruta de "%s" es "%s"', (title, expectedHref) => {
        const item = cocinaFacilMock.find(i => i.title === title);
        expect(item).toBeTruthy();
        expect(item.linkProps.href).toBe(expectedHref);
    });

    it('cocinaAMedidaMock have 8 items', () => {
        expect(cocinaAMedidaMock).toHaveLength(8);
    });

    it.each([
        ['Menú semanal', '/menu-semanal/'],
        ['Ingredientes de cocina', '/ingredientes/'],
        ['Vegetariana', '/recetas/dieta/vegetariana/'],
        ['Sin gluten', '/recetas/dieta/sin-gluten/'],
        ['Keto', '/recetas/dieta/keto/'],
        ['Sin lactosa', '/recetas/dieta/sin-lactosa/'],
        ['Vegana', '/recetas/dieta/vegana/'],
        ['Saludable', '/recetas/que-cocinar-hoy/saludable/']
    ])('la ruta de "%s" es "%s"', (title, expectedHref) => {
        const item = cocinaAMedidaMock.find(i => i.title === title);
        expect(item).toBeTruthy();
        expect(item.linkProps.href).toBe(expectedHref);
    });

    it('recetasMock have 6 items', () => {
        expect(recetasMock).toHaveLength(6);
    });

    it.each([
        ['Saladas', '/recetas/saladas/'],
        ['Dulces', '/recetas/dulces/'],
        ['De autor', '/recetas/que-cocinar-hoy/de-autor/'],
        ['Bebidas', '/recetas/bebidas/'],
        ['Tendencias en la cocina', '/tendencias/'],
        ['Chefs protagonistas', '/chefs-protagonistas/']
    ])('la ruta de "%s" es "%s"', (title, expectedHref) => {
        const item = recetasMock.find(i => i.title === title);
        expect(item).toBeTruthy();
        expect(item.linkProps.href).toBe(expectedHref);
    });

    it('getMockBySubcategory returns the expected mock', () => {
        expect(getMockBySubcategory('/aprende-en-la-cocina/')).toStrictEqual(
            aprendeEnCocinaMock
        );
        expect(getMockBySubcategory('/cocina-facil-y-rapido/')).toStrictEqual(
            cocinaFacilMock
        );
        expect(getMockBySubcategory('/cocina-a-tu-medida/')).toStrictEqual(
            cocinaAMedidaMock
        );
        expect(getMockBySubcategory('/recetas/')).toStrictEqual(recetasMock);
    });

    it('getMockBySubcategory returns empty array for unknown paths', () => {
        expect(getMockBySubcategory('/unknown-path/')).toEqual([]);
        expect(getMockBySubcategory('')).toEqual([]);
        expect(getMockBySubcategory()).toEqual([]);
    });

    it('all mock items have required properties', () => {
        const allMocks = [
            ...aprendeEnCocinaMock,
            ...cocinaFacilMock,
            ...cocinaAMedidaMock,
            ...recetasMock
        ];

        allMocks.forEach((item, index) => {
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('imageProps');
            expect(item).toHaveProperty('linkProps');
            expect(item).toHaveProperty('container');
            expect(item).toHaveProperty('trackingLabel');

            expect(item.imageProps).toHaveProperty('src');
            expect(item.imageProps).toHaveProperty('alt');
            expect(item.imageProps.alt).toBe(`Imagen de ${item.title}`);

            expect(item.linkProps).toHaveProperty('href');
            expect(item.linkProps).toHaveProperty('title');
            expect(item.linkProps.title).toBe(`Ir a ${item.title}`);

            expect(item.trackingLabel).toBeTruthy();
        });
    });

    describe('trackHomeCard', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should call addEventToDataLayerV2 with correct parameters', () => {
            const cardData = { trackingLabel: 'recetas_home' };

            trackHomeCard(cardData);

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                category: 'cards_home',
                label: 'recetas_home',
                action: 'N/A'
            });
        });

        it('should not call addEventToDataLayerV2 if cardData is null', () => {
            trackHomeCard(null);

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });

        it('should not call addEventToDataLayerV2 if trackingLabel is missing', () => {
            const cardData = { title: 'Test' };

            trackHomeCard(cardData);

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });

        it('should handle empty trackingLabel', () => {
            const cardData = { trackingLabel: '' };

            trackHomeCard(cardData);

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });
    });

    describe('trackSubcategoryCard', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should track aprende-en-la-cocina cards correctly', () => {
            const cardData = { trackingLabel: 'tutoriales_de_cocina' };
            const subcategoryUrl = '/aprende-en-la-cocina/';

            trackSubcategoryCard(cardData, subcategoryUrl);

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                category: 'cards_aprende_a_cocinar',
                label: 'tutoriales_de_cocina',
                action: 'N/A'
            });
        });

        it('should track cocina-facil-y-rapido cards correctly', () => {
            const cardData = { trackingLabel: 'recetas_faciles' };
            const subcategoryUrl = '/cocina-facil-y-rapido/';

            trackSubcategoryCard(cardData, subcategoryUrl);

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                category: 'cards_cocina_facil',
                label: 'recetas_faciles',
                action: 'N/A'
            });
        });

        it('should track cocina-a-tu-medida cards correctly', () => {
            const cardData = { trackingLabel: 'menu_semanal' };
            const subcategoryUrl = '/cocina-a-tu-medida/';

            trackSubcategoryCard(cardData, subcategoryUrl);

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                category: 'cards_cocina_a_tu_manera',
                label: 'menu_semanal',
                action: 'N/A'
            });
        });

        it('should track recetas cards correctly', () => {
            const cardData = { trackingLabel: 'recetas_saladas' };
            const subcategoryUrl = '/recetas/';

            trackSubcategoryCard(cardData, subcategoryUrl);

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                category: 'cards_recetas',
                label: 'recetas_saladas',
                action: 'N/A'
            });
        });
    });
    describe('createMockItem (src - classNames)', () => {
        it('use value src when provided', () => {
            const item = createMockItem({
                title: 'Pizza Margarita',
                href: '/recetas/pizza-margarita/',
                trackingLabel: 'pizza_margarita',
                src: '/images/pizza.jpg'
            });

            expect(item.imageProps.src).toBe('/images/pizza.jpg');
            expect(item.imageProps.alt).toBe('Imagen de Pizza Margarita');
        });

        it('includes classNames only when truthy', () => {
            const withClass = createMockItem({
                title: 'Empanadas',
                href: '/recetas/empanadas/',
                trackingLabel: 'empanadas',
                src: '/images/empanadas.jpg',
                classNames: 'card--featured'
            });
            expect(withClass.classNames).toBe('card--featured');

            const withoutClass = createMockItem({
                title: 'Empanadas',
                href: '/recetas/empanadas/',
                trackingLabel: 'empanadas',
                src: '/images/empanadas.jpg',
                classNames: ''
            });
            expect(withoutClass.classNames).toBeUndefined();
        });
    });
});
