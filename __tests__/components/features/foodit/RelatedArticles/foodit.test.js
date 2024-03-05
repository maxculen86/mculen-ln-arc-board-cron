import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedArticles from '../../../../../components/features/foodit/RelatedArticles/foodit';
import relatedArticlesMock from ' ../../../__mocks__/data/fooditRelatedArticles/relatedArticles.json';
import relatedArticlesByAuthorMock from ' ../../../__mocks__/data/fooditRelatedArticles/relatedArticleByAuthor.json';
import useGetRelatedArticles from '../../../../../components/features/foodit-global/hooks/useGetRelatedArticles';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../components/features/foodit-global/hooks/useGetRelatedArticles',
    () => jest.fn()
);

global.IntersectionObserver = jest.fn((callback, options) => {
    return {
        observe: jest.fn(() => {
            callback([{ isIntersecting: true }]);
        }),
        disconnect: jest.fn(),
        unobserve: jest.fn()
    };
});

describe('Tests feature Foodit RelatedArticles', () => {
    describe('Tests cases for error', () => {
        test('should show required ID', () => {
            useGetRelatedArticles.mockImplementation(() => []);

            const customFields = {
                idSectionOrAuthor: '',
                filterBy: 'section',
                layout: 'carousel'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields
            };

            render(<RelatedArticles {...props} />);
            expect(
                screen.getByText(
                    'Para filtro por autor o sección se requiere que ingrese un ID'
                )
            ).toBeInTheDocument();
        });

        test('should show required minArticles for carousel layout', () => {
            useGetRelatedArticles.mockImplementation(() => [
                {
                    title: 'Una comida si saludable',
                    author: 'Por Maru Botana',
                    image: {
                        alt_text: 'Hamburguesa de carne vacuna (Pixabay)',
                        height: 340,
                        url:
                            'https://resizer.glanacion.com/resizer/ttw_XUbR1t55Ty0ISOaOlcVCJ2c=/768x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/A4K4E42OW5GKHAPCLOBH7A2WBY.jpg',
                        width: 453
                    },
                    tag: '',
                    href: '/dieta/una-comida-si-saludable-nid06092023/'
                }
            ]);

            const customFields = {
                idSectionOrAuthor: '12345',
                filterBy: 'section',
                layout: 'carousel'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields
            };

            render(<RelatedArticles {...props} />);
            expect(
                screen.getByText('Se requieren un minimo de 4 articulos')
            ).toBeInTheDocument();
        });

        test('should show required minArticles for carousel layout', () => {
            useGetRelatedArticles.mockImplementation(() => [
                {
                    title: 'Una comida si saludable',
                    author: 'Por Maru Botana',
                    image: {
                        alt_text: 'Hamburguesa de carne vacuna (Pixabay)',
                        height: 340,
                        url:
                            'https://resizer.glanacion.com/resizer/ttw_XUbR1t55Ty0ISOaOlcVCJ2c=/768x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/A4K4E42OW5GKHAPCLOBH7A2WBY.jpg',
                        width: 453
                    },
                    tag: '',
                    href: '/dieta/una-comida-si-saludable-nid06092023/'
                }
            ]);

            const customFields = {
                idSectionOrAuthor: '12345',
                filterBy: 'section',
                layout: 'bn_12_grid'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields
            };

            render(<RelatedArticles {...props} />);
            expect(
                screen.getByText('Se requieren un minimo de 3 articulos')
            ).toBeInTheDocument();
        });

        test('should show error layout not found', () => {
            useGetRelatedArticles.mockImplementation(() => []);

            const customFields = {
                idSectionOrAuthor: '',
                filterBy: 'section',
                layout: ''
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields
            };

            render(<RelatedArticles {...props} />);
            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeInTheDocument();
        });
    });

    describe('Tests cases for RelatedArticles', () => {
        test('should show articles carousel', () => {
            useGetRelatedArticles.mockImplementation(() => relatedArticlesMock);

            const customFields = {
                idSectionOrAuthor: '',
                filterBy: 'relatedArticles',
                layout: 'carousel'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields,
                globalContent: {
                    taxonomy: {
                        primary_section: {
                            _id: 'primary section id',
                            name: 'Pollo'
                        }
                    }
                }
            };

            render(<RelatedArticles {...props} />);

            expect(screen.getByText('Más recetas: Pollo')).toBeInTheDocument();

            expect(
                screen.getByText('Torta de chocolate, chiles y almendras')
            ).toBeInTheDocument();
        });

        test('should show articles grid 12', () => {
            useGetRelatedArticles.mockImplementation(() => relatedArticlesMock);

            const customFields = {
                idSectionOrAuthor: '',
                filterBy: 'relatedArticles',
                layout: 'bn_12_grid'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields,
                globalContent: {
                    taxonomy: {
                        primary_section: {
                            _id: 'primary section id',
                            name: 'Fácil'
                        }
                    }
                }
            };

            render(<RelatedArticles {...props} />);

            expect(screen.getByText('Más recetas: Fácil')).toBeInTheDocument();

            expect(screen.getAllByRole('article')).toHaveLength(12);

            expect(
                screen.getByText('Torta de chocolate, chiles y almendras')
            ).toBeInTheDocument();
        });

        test('should show articles grid 12 and not show the article', () => {
            useGetRelatedArticles.mockImplementation(() => relatedArticlesMock);

            const customFields = {
                idSectionOrAuthor: '',
                filterBy: 'relatedArticles',
                layout: 'bn_12_grid'
            };
            const props = {
                id: '12345',
                customFields,
                globalContent: {
                    _id: 'IDEDE5L2YZB7ZMS3QLBZMAYXJM',
                    taxonomy: {
                        primary_section: {
                            _id: 'primary section id',
                            name: 'Fácil'
                        }
                    }
                }
            };

            render(<RelatedArticles {...props} />);
            const articles = screen.getAllByRole('article');
            const titleArticles = articles.map(article => article.textContent);
            expect(articles).toHaveLength(11);
            expect(
                titleArticles.includes('Trufas de chocolate al Grand Marnier')
            ).toBeFalsy();
        });

        test('Should show title by section', () => {
            useGetRelatedArticles.mockImplementation(() => relatedArticlesMock);

            const customFields = {
                idSectionOrAuthor: '/recetas/saladas/pizza',
                filterBy: 'section',
                layout: 'carousel'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields,
                globalContent: {
                    taxonomy: {
                        primary_section: {
                            _id: 'primary section id',
                            name: 'Pollo'
                        }
                    }
                }
            };

            render(<RelatedArticles {...props} />);
            expect(screen.getByText('Más recetas: Pizza')).toBeInTheDocument();
        });

        test('Should show title by author', () => {
            useGetRelatedArticles.mockImplementation(
                () => relatedArticlesByAuthorMock
            );

            const customFields = {
                idSectionOrAuthor: 'maru-botana-3363', // Mocked response made from this author Id
                filterBy: 'author',
                layout: 'carousel'
            };
            const props = {
                id: '12345',
                isAdmin: true,
                customFields,
                globalContent: {
                    taxonomy: {
                        primary_section: {
                            _id: 'primary section id',
                            name: 'Pollo'
                        }
                    }
                }
            };

            render(<RelatedArticles {...props} />);

            expect(
                screen.getByText('Más recetas: Maru Botana')
            ).toBeInTheDocument();
        });
    });
});
