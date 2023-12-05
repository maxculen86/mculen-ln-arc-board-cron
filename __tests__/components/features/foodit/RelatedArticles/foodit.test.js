import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedArticles from '../../../../../components/features/foodit/RelatedArticles/foodit';
import articles from ' ../../../__mocks__/data/foodit_Caja_Collection/articlesTransformed';
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
});
