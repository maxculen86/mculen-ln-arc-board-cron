import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeaderFoodit from '../../../../../../components/features/foodit-global/common/Header/foodit';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import menuCategories from '../../../../../../__mocks__/data/fooditMenuCategories/menuCategories';
import useGetUserData from '../../../../../../components/private/common/auth/hooks/useGetUserData';
import { useNavigationData } from '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData';
import { getAccessSource } from '../../../../../../components/features/foodit-global/common/utils/getAccessSource';

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/getAccessSource',
    () => ({
        getAccessSource: jest.fn(() => 'web')
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useGetUserData'
);

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useGetUserData',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData',
    () => ({
        useNavigationData: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useStickyHeader',
    () => ({
        useStickyHeader: () => ({ sticky: true })
    })
);

describe('Components - Features - foodit-global - Common - HeaderFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Foodit-home',
        siteProperties: {
            layoutsName: {
                FooditHome: 'Foodit-home'
            }
        }
    }));

    beforeEach(() => {
        useNavigationData.mockReturnValue({ categories: [] });
    });

    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    // it('when the header state sticky is true, should contain fixed class', () => {
    //     render(<HeaderFoodit isSticky />);
    //     const header = document.querySelector('header');
    //     expect(header.classList.contains('fixed')).toBeTruthy();
    // });

    it('should return buttons login and button suscribed when the user is unlogged', () => {
        useNavigationData.mockReturnValue({
            categories: menuCategories
        });
        useGetUserData.mockReturnValue({
            userType: 'unlogged',
            userEmail: '',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        const { container } = render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('INICIÁ SESIÓN')).toHaveLength(2);
        expect(screen.getAllByText('SUSCRIBITE GRATIS')).toHaveLength(2);
        expect(container).toMatchSnapshot();
    });

    describe('Desktop menu behavior', () => {
        const desktopMenuCategories = [
            {
                title: 'Aprendé',
                data: [
                    {
                        items: [
                            {
                                text: 'Tutoriales de cocina salada',
                                href: 'https://foodit.lanacion.com.ar/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutoriales+de+cocina+salada&groups=occasions&itemGroups=Tutoriales+de+cocina+salada',
                                menuType: 'primary'
                            },
                            {
                                text: 'Masterclass de chefs',
                                href: 'https://foodit.lanacion.com.ar/masterclass/',
                                menuType: 'primary'
                            },
                            {
                                text: 'Guías de cocina',
                                href: 'https://foodit.lanacion.com.ar/guia-de-cocina/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Cociná fácil',
                data: [
                    {
                        items: [
                            {
                                text: 'Recetas fáciles',
                                href: 'https://foodit.lanacion.com.ar/recetas/que-cocinar-hoy/facil/',
                                menuType: 'primary'
                            },
                            {
                                text: 'Recetas rápidas',
                                href: 'https://foodit.lanacion.com.ar/recetas/que-cocinar-hoy/rapida/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'A tu medida',
                data: [
                    {
                        items: [
                            {
                                text: 'Vegetariana',
                                href: 'https://foodit.lanacion.com.ar/recetas/dieta/vegetariana/',
                                menuType: 'primary'
                            },
                            {
                                text: 'Sin gluten',
                                href: 'https://foodit.lanacion.com.ar/recetas/dietas/sin-gluten/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Recetas',
                href: 'https://foodit.lanacion.com.ar/recetas/'
            },
            {
                title: 'Conocenos',
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary'
            }
        ];

        it('should render desktop menu with short navigation titles (nav_title)', () => {
            useNavigationData.mockReturnValue({
                categories: desktopMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(screen.getAllByText('Aprendé').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Cociná fácil').length).toBeGreaterThan(
                0
            );
            expect(screen.getAllByText('A tu medida').length).toBeGreaterThan(
                0
            );
            expect(screen.getAllByText('Recetas').length).toBeGreaterThan(0);
        });

        it('should render desktop menu items correctly', () => {
            useNavigationData.mockReturnValue({
                categories: desktopMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(
                screen.getAllByText('Masterclass de chefs').length
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText('Guías de cocina').length
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText('Recetas fáciles').length
            ).toBeGreaterThan(0);
            expect(screen.getAllByText('Vegetariana').length).toBeGreaterThan(
                0
            );
        });

        it('should always include Conocenos on desktop', () => {
            useNavigationData.mockReturnValue({
                categories: desktopMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const conocenosLinks = screen.getAllByText('Conocenos');
            expect(conocenosLinks.length).toBeGreaterThan(0);

            const conocenosLinksWithHref = conocenosLinks
                .map(el => el.closest('a'))
                .filter(
                    link =>
                        link?.getAttribute('href') ===
                        'https://conocenos.foodit.com.ar/'
                );

            expect(conocenosLinksWithHref.length).toBeGreaterThan(0);
        });

        it('should not include CLUB LA NACION on desktop', () => {
            useNavigationData.mockReturnValue({
                categories: desktopMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(screen.queryByText('CLUB LA NACION')).toBeNull();
        });

        it('should render tutorial URLs with query parameters', () => {
            useNavigationData.mockReturnValue({
                categories: desktopMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const tutorialLinks = screen
                .getAllByText('Tutoriales de cocina salada')
                .map(el => el.closest('a'))
                .filter(link => link !== null);

            expect(tutorialLinks.length).toBeGreaterThan(0);

            const linksWithParams = tutorialLinks.filter(link => {
                const href = link.getAttribute('href');
                return (
                    href &&
                    href.includes('?query=recetas') &&
                    href.includes('title=Tutoriales+de+cocina+salada')
                );
            });

            expect(linksWithParams.length).toBeGreaterThan(0);
        });
    });

    describe('Mobile menu behavior', () => {
        const mobileMenuCategories = [
            {
                title: 'Aprende en la cocina',
                data: [
                    {
                        items: [
                            {
                                text: 'Tutoriales de Cocina Salada',
                                href: 'https://foodit.lanacion.com.ar/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutoriales+de+cocina+salada&groups=occasions&itemGroups=Tutoriales+de+cocina+salada',
                                menuType: 'primary'
                            },
                            {
                                text: 'Masterclass de chefs',
                                href: 'https://foodit.lanacion.com.ar/masterclass/',
                                menuType: 'primary'
                            },
                            {
                                text: 'Guías de cocina',
                                href: 'https://foodit.lanacion.com.ar/guia-de-cocina/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Cocina fácil y rápido',
                data: [
                    {
                        items: [
                            {
                                text: 'Recetas fáciles',
                                href: 'https://foodit.lanacion.com.ar/recetas/que-cocinar-hoy/facil/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Cocina a tu medida',
                data: [
                    {
                        items: [
                            {
                                text: 'Vegetariana',
                                href: 'https://foodit.lanacion.com.ar/recetas/dieta/vegetariana/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Recetas',
                href: 'https://foodit.lanacion.com.ar/recetas/'
            },
            {
                title: 'Conocenos',
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary'
            },
            {
                title: 'CLUB LA NACION',
                href: 'https://foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary'
            }
        ];

        it('should render mobile menu with full category names', () => {
            useNavigationData.mockReturnValue({
                categories: mobileMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(
                screen.getAllByText('Aprende en la cocina').length
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText('Cocina fácil y rápido').length
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText('Cocina a tu medida').length
            ).toBeGreaterThan(0);
        });

        it('should include CLUB LA NACION only on mobile', () => {
            useNavigationData.mockReturnValue({
                categories: mobileMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const clubLinks = screen.getAllByText('CLUB LA NACION');
            expect(clubLinks.length).toBeGreaterThan(0);

            const clubLinksWithHref = clubLinks
                .map(el => el.closest('a'))
                .filter(
                    link =>
                        link?.getAttribute('href') ===
                        'https://foodit.lanacion.com.ar/club-la-nacion/'
                );

            expect(clubLinksWithHref.length).toBeGreaterThan(0);
        });

        it('should use nav_title for tutorial items on mobile', () => {
            useNavigationData.mockReturnValue({
                categories: mobileMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(
                screen.getAllByText('Tutoriales de Cocina Salada').length
            ).toBeGreaterThan(0);
        });

        it('should always include Conocenos on mobile', () => {
            useNavigationData.mockReturnValue({
                categories: mobileMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const conocenosLinks = screen.getAllByText('Conocenos');
            expect(conocenosLinks.length).toBeGreaterThan(0);

            const conocenosLinksWithHref = conocenosLinks
                .map(el => el.closest('a'))
                .filter(
                    link =>
                        link?.getAttribute('href') ===
                        'https://conocenos.foodit.com.ar/'
                );

            expect(conocenosLinksWithHref.length).toBeGreaterThan(0);
        });
    });

    describe('Menu structure and items', () => {
        const testMenuCategories = [
            {
                title: 'Aprendé',
                data: [
                    {
                        items: [
                            {
                                text: 'Item 1',
                                href: 'https://foodit.lanacion.com.ar/item1/',
                                menuType: 'primary'
                            },
                            {
                                text: 'Item 2',
                                href: 'https://foodit.lanacion.com.ar/item2/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Recetas',
                href: 'https://foodit.lanacion.com.ar/recetas/'
            },
            {
                title: 'Conocenos',
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary'
            }
        ];

        it('should render categories with children (dropdown menus)', () => {
            useNavigationData.mockReturnValue({
                categories: testMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            expect(screen.getAllByText('Aprendé').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Item 1').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Item 2').length).toBeGreaterThan(0);
        });

        it('should render categories without children (simple links)', () => {
            useNavigationData.mockReturnValue({
                categories: testMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const recetasLinks = screen
                .getAllByText('Recetas')
                .map(el => el.closest('a'))
                .filter(
                    link =>
                        link?.getAttribute('href') ===
                        'https://foodit.lanacion.com.ar/recetas/'
                );

            expect(recetasLinks.length).toBeGreaterThan(0);
        });

        it('should render secondary menu items correctly', () => {
            useNavigationData.mockReturnValue({
                categories: testMenuCategories
            });
            useGetUserData.mockReturnValue({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                isSubscribed: false
            });

            render(
                <HeaderFoodit
                    layout="Foodit-home"
                    layoutsName={{
                        FooditHome: 'Foodit-home',
                        FooditAcumulado: 'Foodit-acumulado'
                    }}
                />
            );

            const conocenosLinks = screen.getAllByText('Conocenos');
            expect(conocenosLinks.length).toBeGreaterThan(0);
        });
    });

    it('should show the user avatar with the initials of their name when the user is logged and subscribed to foodit.', () => {
        useContent.mockReturnValue(menuCategories);
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('HM')).toHaveLength(1);
    });

    it('Should show the initials and button "SUSCRIBITE" when the user is not sucribed', () => {
        useContent.mockReturnValue(menuCategories);
        useGetUserData.mockReturnValue({
            userType: 'logged',
            userEmail: 'hola@mundo.com',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        expect(screen.getAllByText('HO')).toHaveLength(1);
        expect(screen.getAllByText('SUSCRIBITE GRATIS')).toHaveLength(2);
    });

    it('The logo should render as an "h1" tag on the homepage.', () => {
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-home"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        const logoText = screen.getByText('Foodit');
        expect(logoText).toBeInTheDocument();
        expect(logoText.parentElement.tagName).toBe('H1');
    });

    it('should apply correct classes when layout is FooditBuscador', () => {
        useGetUserData.mockReturnValue({
            userType: 'logged',
            userEmail: 'hola@mundo.com',
            userName: '',
            userLastName: '',
            isSubscribed: false
        });

        const layoutsName = {
            FooditHome: 'Foodit-home',
            FooditAcumulado: 'Foodit-acumulado',
            FooditBuscador: 'Foodit-buscador'
        };

        const { container } = render(
            <HeaderFoodit layout="Foodit-buscador" layoutsName={layoutsName} />
        );

        const headerContainer = container.querySelector('.z-15');

        expect(headerContainer).not.toHaveClass('--hide-search');
    });

    it('The logo should render as an "div" tag on the other layouts.', () => {
        useGetUserData.mockReturnValue({
            userType: 'subscribed',
            userEmail: 'hola@mundo.com',
            userName: 'Hola',
            userLastName: 'Mundo',
            isSubscribed: true
        });

        render(
            <HeaderFoodit
                layout="Foodit-acumulado"
                layoutsName={{
                    FooditHome: 'Foodit-home',
                    FooditAcumulado: 'Foodit-acumulado'
                }}
            />
        );

        const logoText = screen.getByText('Foodit');
        expect(logoText).toBeInTheDocument();
        expect(logoText.parentElement.tagName).toBe('DIV');
    });
});
