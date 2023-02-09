import React from 'react';
import CajaManual from '../../../../components/chains/LN10_Caja_Manual/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArticleFearute from '../../../../components/features/LN-10/article/default';
import renderables from '../../../../__mocks__/data/LN10_Caja_Manual/renderables.json';
import mockChildProps from '../../../../__mocks__/data/LN10_Caja_Manual/childProps.json';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/features/LN-10/article/default',
    () => 'mocked-ArticleFeature'
);

jest.mock(
    '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners',
    () => jest.fn()
);
describe('Tests Chain CajaManual', () => {
    const mockedArticleFeature = (
        <ArticleFearute noteId="BBU3ZCWFBRALRO4FZAHJ5XGW74" />
    );
    const customFields = {
        title: 'Caja Manual',
        layout: '',
        hideTitle: false,
        hideCaja: false,
        link: '',
        linkButton: '',
        chainStyle: '',
        logoId: '',
        buttonStyle: '',
        buttonText: '',
        navigator: ''
    };
    const getProps = ({
        customFields,
        childProps = mockChildProps,
        children = [mockedArticleFeature]
    }) => ({
        id: 'c0faDu3rJPJ41dG',
        isAdmin: true,
        customFields,
        childProps,
        children,
        renderables
    });

    describe('Tests for the case warnning', () => {
        test('should return a warning when there is no layout defined', () => {
            render(<CajaManual {...getProps({ customFields })} />);

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeVisible();
        });

        test('Should return a warning specifying a minimum item load', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4'
            };
            render(
                <CajaManual
                    {...getProps({ customFields: fields, childProps: [] })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere la carga de 3 artículos')
            ).toBeVisible();
        });

        test('should return a warning when adding a feature other than LN10 Article', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4'
            };
            render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        childProps: [
                            ...mockChildProps,
                            { type: 'LN-common/articulo' }
                        ]
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
                )
            ).toBeVisible();
        });
    });

    describe('Tests for the case of BN grid 8 and 4', () => {
        test('should return a grid of 4 items', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4'
            };
            const children = [
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature
            ];

            const { container } = render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        children
                    })}
                />
            );

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(4);

            screen.debug();
        });

        test('should return a grid of 8 items', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla8'
            };
            const children = [
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature,
                mockedArticleFeature
            ];

            const { container } = render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        children
                    })}
                />
            );

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(8);
        });
    });
});
