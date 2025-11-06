import React from 'react';
import { render } from '@testing-library/react';
import { CardCategory } from '../../../../../../components/layouts/Foodit-subcategorias/Card/CardCategory';
import { getTypeOfDevicev2 } from '@ln/utils';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('@ln/utils', () => ({
    ...jest.requireActual('@ln/utils'),
    getTypeOfDevicev2: jest.fn()
}));

jest.mock('@ln/foodit-ui-category', () => ({
    Category: ({ title, container, classnames, imageProps, linkProps }) => {
        const containerClass =
            container === 'double'
                ? 'col-span-8 col-span-6_md'
                : 'col-span-4 col-span-3_md';

        const flexClass =
            container === 'double'
                ? 'flex h-100 w-100 jc-center jc-start_lg'
                : 'flex flex-row_lg h-100_lg ai-center flex-column';

        const textContainerClass =
            container === 'double'
                ? 'pl-4 text-start'
                : '-mt-4 pl-4_lg text-start_lg text-center';

        return (
            <article
                data-testid="category"
                data-container={container}
                className={`border border-all border-thin w-100 h-100 ${containerClass} border-light-200 p-12 col-span-4_lg ${classnames?.container || ''}`}
            >
                <a
                    className={`link foodit-link flex gap-8 ai-center roboto-regular text-inherit ${flexClass}`}
                    data-variant="primary"
                    href={linkProps?.href}
                    target="_self"
                    title={linkProps?.title}
                    onClick={linkProps?.onClick}
                >
                    <div className="w-100 max-w-96">
                        <div className="foodit-placeholder w-100 ratio-3-2">
                            <img
                                alt={imageProps?.alt}
                                className="image flex w-100 ratio-3-2 --cover"
                                decoding="async"
                                fetchpriority="low"
                                loading={imageProps?.loading || 'lazy'}
                                src={imageProps?.src}
                            />
                        </div>
                    </div>
                    <div className={textContainerClass}>
                        <span className="text roboto roboto-bold text-16">
                            {title}
                        </span>
                    </div>
                </a>
            </article>
        );
    }
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ children, as: Component = 'div', className }) => (
        <Component className={className}>{children}</Component>
    )
}));

jest.mock(
    '../../../../../../components/layouts/Foodit-subcategorias/hooks/useImagePreload',
    () => ({
        useImagePreload: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/layouts/Foodit-subcategorias/_helpers',
    () => ({
        applyPageBasedPriority: jest.fn(imageProps => ({
            ...imageProps,
            loading: 'lazy'
        })),
        getCriticalImagesForPage: jest.fn(() => []),
        trackSubcategoryCard: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/subcategorias/helpers',
    () => ({
        cocinaAMedidaMock: [
            {
                title: 'Menú semanal',
                imageProps: {
                    src: 'menu-semanal.webp',
                    alt: 'Imagen de Menú semanal'
                },
                linkProps: {
                    href: '/menu-semanal/',
                    title: 'Ir a Menú semanal'
                },
                trackingLabel: 'menu_semanal',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Ingredientes de cocina',
                imageProps: {
                    src: 'ingredientes-cocina.webp',
                    alt: 'Imagen de Ingredientes de cocina'
                },
                linkProps: {
                    href: '/ingredientes/',
                    title: 'Ir a Ingredientes de cocina'
                },
                trackingLabel: 'ingredientes_de_cocina',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Vegetariana',
                imageProps: {
                    src: 'vegetariana.webp',
                    alt: 'Imagen de Vegetariana'
                },
                linkProps: {
                    href: '/recetas/dieta/vegetariana/',
                    title: 'Ir a Vegetariana'
                },
                trackingLabel: 'recetas_vegetariana',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Sin gluten',
                imageProps: {
                    src: 'sin-gluten.webp',
                    alt: 'Imagen de Sin gluten'
                },
                linkProps: {
                    href: '/recetas/dieta/sin-gluten/',
                    title: 'Ir a Sin gluten'
                },
                trackingLabel: 'recetas_sin_gluten',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Keto',
                imageProps: { src: 'keto.webp', alt: 'Imagen de Keto' },
                linkProps: {
                    href: '/recetas/dieta/keto/',
                    title: 'Ir a Keto'
                },
                trackingLabel: 'recetas_keto',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Sin lactosa',
                imageProps: {
                    src: 'sin-lactosa.webp',
                    alt: 'Imagen de Sin lactosa'
                },
                linkProps: {
                    href: '/recetas/dieta/sin-lactosa/',
                    title: 'Ir a Sin lactosa'
                },
                trackingLabel: 'recetas_sin_lactosa',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Vegana',
                imageProps: {
                    src: 'vegana.webp',
                    alt: 'Imagen de Vegana'
                },
                linkProps: {
                    href: '/recetas/dieta/vegana/',
                    title: 'Ir a Vegana'
                },
                trackingLabel: 'recetas_vegana',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            },
            {
                title: 'Saludable',
                imageProps: {
                    src: 'saludable.webp',
                    alt: 'Imagen de Saludable'
                },
                linkProps: {
                    href: '/recetas/que-cocinar-hoy/saludable/',
                    title: 'Ir a Saludable'
                },
                trackingLabel: 'recetas_saludable',
                classNames: 'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                container: 'media'
            }
        ],
        getMockBySubcategory: jest.fn()
    })
);

const { useAppContext } = require('fusion:context');
const {
    useImagePreload
} = require('../../../../../../components/layouts/Foodit-subcategorias/hooks/useImagePreload');
const {
    getMockBySubcategory
} = require('../../../../../../components/features/foodit-global/common/subcategorias/helpers');

describe('CardCategory snapshots', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024
        });

        useImagePreload.mockImplementation(() => {});
    });

    const testCases = [
        {
            name: 'cocina-a-tu-medida',
            uri: '/cocina-a-tu-medida/',
            expectedContent: 'Menú semanal'
        },
        {
            name: 'cocina-facil',
            uri: '/cocina-facil-y-rapido/',
            mockData: [
                {
                    title: 'Mealprep',
                    imageProps: {
                        src: 'mealprep.webp',
                        alt: 'Imagen de Meal prep'
                    },
                    linkProps: {
                        href: '/recetas/que-cocinar-hoy/meal-prep/',
                        title: 'Ir a Meal prep'
                    },
                    trackingLabel: 'meal_prep',
                    classNames: 'min-h-120',
                    container: 'double'
                },
                {
                    title: 'Recetas fáciles',
                    imageProps: {
                        src: 'recetas-faciles.webp',
                        alt: 'Imagen de Recetas fáciles'
                    },
                    linkProps: {
                        href: '/recetas/que-cocinar-hoy/facil/',
                        title: 'Ir a Recetas fáciles'
                    },
                    trackingLabel: 'recetas_faciles',
                    classNames: 'min-h-113 min-h-120_md',
                    container: 'media'
                },
                {
                    title: 'Recetas rápidas',
                    imageProps: {
                        src: 'recetas-rapidas.webp',
                        alt: 'Imagen de Recetas rápidas'
                    },
                    linkProps: {
                        href: '/recetas/que-cocinar-hoy/rapida/',
                        title: 'Ir a Recetas rápidas'
                    },
                    trackingLabel: 'recetas_rapidas',
                    classNames: 'min-h-113 min-h-120_md',
                    container: 'media'
                }
            ]
        },
        {
            name: 'aprende-en-la-cocina',
            uri: '/aprende-en-la-cocina/',
            mockData: [
                {
                    title: 'Tutoriales de cocina salada',
                    imageProps: {
                        src: 'tutoriales-salada.webp',
                        alt: 'Imagen de Tutoriales de cocina salada'
                    },
                    linkProps: {
                        href: '/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutorial%20Cocina%20Salada&groups=occasions&itemGroups=Tutorial%20Cocina%20Salada',
                        title: 'Ir a Tutoriales de cocina salada'
                    },
                    trackingLabel: 'tutoriales_de_cocina_salada',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                },
                {
                    title: 'Tutoriales de pastelería',
                    imageProps: {
                        src: 'tutoriales-pasteleria.webp',
                        alt: 'Imagen de Tutoriales de pastelería'
                    },
                    linkProps: {
                        href: '/tema/tutorial-pasteler%C3%ADa-qat7qtvzy5dmzd6opl4ap2d2se/?query=recetas&title=Tutorial%20Pasteler%C3%ADa&groups=occasions&itemGroups=Tutorial%20Pasteler%C3%ADa',
                        title: 'Ir a Tutoriales de pastelería'
                    },
                    trackingLabel: 'tutoriales_de_pasteleria',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                },
                {
                    title: 'Masterclass de chef',
                    imageProps: {
                        src: 'masterclass.webp',
                        alt: 'Imagen de Masterclass de chef'
                    },
                    linkProps: {
                        href: '/masterclass/',
                        title: 'Ir a Masterclass de chef'
                    },
                    trackingLabel: 'masterclass_de_chef',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                },
                {
                    title: 'Guías de cocina',
                    imageProps: {
                        src: 'guias.webp',
                        alt: 'Imagen de Guías de cocina'
                    },
                    linkProps: {
                        href: '/guias-de-cocina/',
                        title: 'Ir a Guías de cocina'
                    },
                    trackingLabel: 'guias_de_cocina',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                },
                {
                    title: 'Recomendaciones del chef',
                    imageProps: {
                        src: 'recomendaciones-chef.webp',
                        alt: 'Imagen de Recomendaciones del chef'
                    },
                    linkProps: {
                        href: '/chefs/',
                        title: 'Ir a Recomendaciones del chef'
                    },
                    trackingLabel: 'recomendaciones_del_chef',
                    classNames: 'min-h-120',
                    container: 'double'
                },
                {
                    title: 'Trucos y secretos',
                    imageProps: {
                        src: 'trucos-y-secretos.webp',
                        alt: 'Imagen de Trucos y secretos'
                    },
                    linkProps: {
                        href: '/trucos/',
                        title: 'Ir a Trucos y secretos'
                    },
                    trackingLabel: 'trucos_y_secretos',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                },
                {
                    title: 'Protocolo en la mesa',
                    imageProps: {
                        src: 'protocolo.webp',
                        alt: 'Imagen de Protocolo en la mesa'
                    },
                    linkProps: {
                        href: '/protocolo/',
                        title: 'Ir a Protocolo en la mesa'
                    },
                    trackingLabel: 'protocolo_en_la_mesa',
                    classNames: 'min-h-134 min-h-120_lg',
                    container: 'media'
                }
            ]
        },
        {
            name: 'receta',
            uri: '/recetas/',
            mockData: [
                {
                    title: 'Saladas',
                    imageProps: {
                        src: 'saladas.webp',
                        alt: 'Imagen de Saladas'
                    },
                    linkProps: {
                        href: '/recetas/saladas/',
                        title: 'Ir a Saladas'
                    },
                    trackingLabel: 'saladas',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                },
                {
                    title: 'Dulces',
                    imageProps: {
                        src: 'dulces.webp',
                        alt: 'Imagen de Dulces'
                    },
                    linkProps: {
                        href: '/recetas/dulces/',
                        title: 'Ir a Dulces'
                    },
                    trackingLabel: 'dulces',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                },
                {
                    title: 'De autor',
                    imageProps: {
                        src: 'autor.webp',
                        alt: 'Imagen de De autor'
                    },
                    linkProps: {
                        href: '/recetas/que-cocinar-hoy/de-autor/',
                        title: 'Ir a De autor'
                    },
                    trackingLabel: 'de_autor',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                },
                {
                    title: 'Bebidas',
                    imageProps: {
                        src: 'bebidas.webp',
                        alt: 'Imagen de Bebidas'
                    },
                    linkProps: {
                        href: '/recetas/bebidas/',
                        title: 'Ir a Bebidas'
                    },
                    trackingLabel: 'bebidas',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                },
                {
                    title: 'Tendencias en la cocina',
                    imageProps: {
                        src: 'tendencias-cocina.webp',
                        alt: 'Imagen de Tendencias en la cocina'
                    },
                    linkProps: {
                        href: '/tendencias/',
                        title: 'Ir a Tendencias en la cocina'
                    },
                    trackingLabel: 'tendencias-en-la-cocina',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                },
                {
                    title: 'Chefs protagonistas',
                    imageProps: {
                        src: 'chefs-protagonistas.webp',
                        alt: 'Imagen de Chefs protagonistas'
                    },
                    linkProps: {
                        href: '/chefs-protagonistas/',
                        title: 'Ir a Chefs protagonistas'
                    },
                    trackingLabel: 'chefs-protagonistas',
                    classNames:
                        'min-h-134 min-h-max_md min-h-120_lg col-span-4_md',
                    container: 'media'
                }
            ]
        }
    ];

    testCases.forEach(({ name, uri, mockData, expectedContent }) => {
        it(`renders snapshot for ${name}`, () => {
            useAppContext.mockReturnValue({
                requestUri: uri,
                deployment: file => `/deployed${file}`,
                contextPath: '/pf'
            });

            if (mockData) {
                getMockBySubcategory.mockReturnValue(mockData);
            } else {
                getMockBySubcategory.mockReturnValue([]);
            }

            const { asFragment, container } = render(<CardCategory />);

            if (expectedContent) {
                expect(container).toHaveTextContent(expectedContent);
            }

            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('Edge cases', () => {
        beforeEach(() => {
            useAppContext.mockReturnValue({
                requestUri: '/unknown-page/',
                deployment: file => `/deployed${file}`,
                contextPath: '/pf'
            });
        });

        it('renders null when no mock data is available', () => {
            getMockBySubcategory.mockReturnValue(null);

            const { container } = render(<CardCategory />);
            expect(container.firstChild).toBeNull();
        });

        it('renders content when mock data is available', () => {
            getMockBySubcategory.mockReturnValue([
                {
                    title: 'Test Item',
                    imageProps: { src: 'test.webp', alt: 'Test alt' },
                    linkProps: { href: '/test/', title: 'Test link' },
                    trackingLabel: 'test_item',
                    classNames: 'test-class',
                    container: 'media'
                }
            ]);

            const { container } = render(<CardCategory />);
            expect(container.firstChild).not.toBeNull();
            expect(container).toHaveTextContent('Test Item');
        });
    });

    describe('Mobile detection', () => {
        it('passes correct mobile flag to useImagePreload on mobile', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 500
            });
            getTypeOfDevicev2.mockReturnValue('mobile');
            useAppContext.mockReturnValue({
                requestUri: '/aprende-en-la-cocina/',
                deployment: file => `/deployed${file}`,
                contextPath: '/pf'
            });

            getMockBySubcategory.mockReturnValue([]);

            render(<CardCategory />);

            expect(useImagePreload).toHaveBeenCalledWith([], true);
        });

        it('passes correct mobile flag to useImagePreload on desktop', () => {
            useAppContext.mockReturnValue({
                requestUri: '/aprende-en-la-cocina/',
                deployment: file => `/deployed${file}`,
                contextPath: '/pf'
            });
            getTypeOfDevicev2.mockReturnValue('desktop');
            getMockBySubcategory.mockReturnValue([]);

            render(<CardCategory />);

            expect(useImagePreload).toHaveBeenCalledWith([], false);
        });
    });
});
