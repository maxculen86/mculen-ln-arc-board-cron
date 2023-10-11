import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CajaCollection from '../../../../components/chains/foodit_Caja_Collection/foodit';
import articles from ' ../../../__mocks__/data/foodit_Caja_Collection/articlesTransformed';
import useGetArticleInCollectionFoodit from '../../../../components/chains/foodit-global/common/hooks/useGetArticleInCollectionFoodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
jest.mock(
    '../../../../components/chains/foodit-global/common/hooks/useGetArticleInCollectionFoodit',
    () => jest.fn()
);

describe('Tests Chain FOODIT Caja Collection', () => {
    describe('Tests cases for error', () => {
        useGetArticleInCollectionFoodit.mockImplementation(() => articles);

        test('should show error without id collection', () => {
            const customFields = {
                idCollection: '',
                initialPosition: 1,
                title: 'Titulo techo',
                link: 'https://linktecho.com.ar',
                hideTitle: false,
                hideCaja: false,
                layout: 'carousel'
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
                layout: 'carousel'
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
});
