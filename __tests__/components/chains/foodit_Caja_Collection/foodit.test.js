import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CajaCollection from '../../../../components/chains/foodit_Caja_Collection/foodit';
import articlesCollection from ' ../../../__mocks__/data/CommonCollection/articles.json';
import { useGetArticleInCollectionFoodit } from '../../../../components/chains/foodit-global/common/hooks/useGetArticleInCollectionFoodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('@ln/utils', () => ({
    ...jest.requireActual('@ln/utils'),
    getTypeOfDevicev2: jest.fn()
}));

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
jest.mock(
    '../../../../components/chains/foodit-global/common/hooks/useGetArticleInCollectionFoodit',
    () => ({ useGetArticleInCollectionFoodit: jest.fn() })
);

describe('Tests Chain FOODIT Caja Collection', () => {
    describe('Tests cases for error', () => {
        test('should show error without id collection', () => {
            useGetArticleInCollectionFoodit.mockImplementation(
                () => articlesCollection
            );
            const customFields = {
                idCollection: '',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                layout: 'carousel',
                link: 'https://lanacion'
            };
            const props = {
                isAdmin: true,
                customFields
            };

            render(<CajaCollection {...props} />);
            expect(
                screen.getByText('Se requiere el id de la colección')
            ).toBeInTheDocument();
        });

        test('should show error without articles not found', () => {
            useGetArticleInCollectionFoodit.mockImplementation(() => []);

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                layout: 'carousel',
                link: 'https://lanacion'
            };
            const props = {
                isAdmin: true,
                customFields
            };

            render(<CajaCollection {...props} />);
            expect(
                screen.getByText(
                    'La colección ASDWQSCZXVASDASD no encontró notas'
                )
            ).toBeInTheDocument();
        });

        test('should show error layout not found', () => {
            useGetArticleInCollectionFoodit.mockImplementation(() => []);

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                layout: ''
            };
            const props = {
                isAdmin: true,
                customFields
            };

            render(<CajaCollection {...props} />);
            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeInTheDocument();
        });
    });

    describe('Tests cases success', () => {
        test('should show collection carousel', () => {
            global.IntersectionObserver = jest.fn((callback, options) => {
                return {
                    observe: jest.fn(() => {
                        callback([{ isIntersecting: true }]);
                    }),
                    disconnect: jest.fn(),
                    unobserve: jest.fn()
                };
            });

            useGetArticleInCollectionFoodit.mockImplementation(
                () => articlesCollection
            );

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                carouselMobile: false,
                layout: 'carousel'
            };
            const props = {
                isAdmin: true,
                customFields
            };

            const { container } = render(<CajaCollection {...props} />);
            const link = screen.getByText('Titulo techo');
            const buttonRoof = screen.getByRole('button', {
                name: 'Guardar todo'
            });
            const classNameCarousel = container.querySelector('.hide-mobile');

            expect(buttonRoof).toBeTruthy();
            expect(classNameCarousel).toBeInTheDocument();
            expect(buttonRoof).toBeInTheDocument();
            expect(link).toBeInTheDocument();
            expect(link.href).toEqual('https://linktecho.com.ar/');
            expect(link.textContent).toEqual('Titulo techo');
            delete global.IntersectionObserver;
            expect(container).toMatchSnapshot();
        });

        test('should not have the class .hide-mobile if carousel mobile is true', () => {
            global.IntersectionObserver = jest.fn((callback, options) => {
                return {
                    observe: jest.fn(() => {
                        callback([{ isIntersecting: true }]);
                    }),
                    disconnect: jest.fn(),
                    unobserve: jest.fn()
                };
            });

            useGetArticleInCollectionFoodit.mockImplementation(
                () => articlesCollection
            );

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                carouselMobile: true,
                layout: 'carousel'
            };
            const props = {
                customFields
            };

            const { container } = render(<CajaCollection {...props} />);
            const classNameCarousel = container.querySelector('.hide-mobile');

            expect(classNameCarousel).not.toBeInTheDocument();
            expect(container).toMatchSnapshot();
        });

        test('should show collection carousel_4', () => {
            global.IntersectionObserver = jest.fn((callback, options) => {
                return {
                    observe: jest.fn(() => {
                        callback([{ isIntersecting: true }]);
                    }),
                    disconnect: jest.fn(),
                    unobserve: jest.fn()
                };
            });

            useGetArticleInCollectionFoodit.mockImplementation(
                () => articlesCollection
            );

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                carouselMobile: false,
                layout: 'carousel_4'
            };
            const props = {
                isAdmin: true,
                customFields
            };

            const { container } = render(<CajaCollection {...props} />);
            const classNameCarousel = container.querySelector('.hide-mobile');
            const link = screen.getByText('Titulo techo');
            const buttonRoof = screen.getByRole('button', {
                name: 'Guardar todo'
            });

            expect(buttonRoof).toBeTruthy();
            expect(classNameCarousel).toBeInTheDocument();
            expect(buttonRoof).toBeInTheDocument();
            expect(link).toBeInTheDocument();
            expect(link.href).toEqual('https://linktecho.com.ar/');
            expect(link.textContent).toEqual('Titulo techo');
            delete global.IntersectionObserver;
        });

        test('should show collection grid12', () => {
            useGetArticleInCollectionFoodit.mockImplementation(() => [
                ...articlesCollection,
                ...articlesCollection.slice(0, 4)
            ]);

            const customFields = {
                idCollection: 'ASDWQSCZXVASDASD',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                layout: 'bn_12_grid'
            };
            const props = {
                isAdmin: true,
                customFields
            };

            render(<CajaCollection {...props} />);
            const link = screen.getByText('Titulo techo');

            expect(link).toBeInTheDocument();
            expect(link.href).toEqual('https://linktecho.com.ar/');
            expect(link.textContent).toEqual('Titulo techo');
        });
    });
});
