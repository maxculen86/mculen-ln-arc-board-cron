import React from 'react';
import Context from 'fusion:context';
import CajaManual from '../../../../components/chains/LN10_Caja_Manual/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArticleFearute from '../../../../components/features/LN-10/article/default';
import renderables from '../../../../__mocks__/data/LN10_Caja_Manual/renderables.json';
import mockChildProps from '../../../../__mocks__/data/LN10_Caja_Manual/childProps.json';

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

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('Tests Chain CajaManual', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: jest.fn(),
        contextPath: '/pf'
    }));
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
        it('should return a warning when there is no layout defined', () => {
            render(<CajaManual {...getProps({ customFields })} />);

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeVisible();
        });

        it('Should return a warning specifying a minimum item load', () => {
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
                screen.getByText('Se requiere la carga de 4 artículos')
            ).toBeVisible();
        });

        it('should return a warning when adding a feature other than LN10 Article', () => {
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
        it('should return a grid of 4 items', () => {
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
        });

        it('should return a warning when adding a feature other than LN10 Article', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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

    describe('Tests for the case of BN grid 8 and 4 and 3', () => {
        it('Should return a grid of 3 items. variants must be autor, liveblog, regular or html', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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
                        children,
                        childProps: [...mockChildProps]
                    })}
                />
            );

            const variantValues = ['liveblog', 'regular', 'autor', 'html'];

            expect(
                mockChildProps.some(props =>
                    variantValues.includes(props.customFields.variant)
                )
            ).toBeTruthy();

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(3);
        });

        it('should return a warning when adding a feature other than LN10 Article', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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

    describe('Tests for the case of BN grid 8 and 4 and 3', () => {
        it('Should return a grid of 3 items. variants must be autor, liveblog, regular or html', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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
                        children,
                        childProps: [...mockChildProps]
                    })}
                />
            );

            const variantValues = ['liveblog', 'regular', 'autor', 'html'];

            expect(
                mockChildProps.some(props =>
                    variantValues.includes(props.customFields.variant)
                )
            ).toBeTruthy();

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(3);
        });

        it('should return a warning when adding a feature other than LN10 Article', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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

    describe('Tests for the case of BN grid 8 and 4 and 3', () => {
        it('Should return a grid of 3 items. variants must be autor, liveblog, regular or html', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid'
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
                        children,
                        childProps: [...mockChildProps]
                    })}
                />
            );

            const variantValues = ['liveblog', 'regular', 'autor', 'html'];

            expect(
                mockChildProps.some(props =>
                    variantValues.includes(props.customFields.variant)
                )
            ).toBeTruthy();

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(3);
        });

        it('should return a grid of 8 items', () => {
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
                        children,
                        childProps: [...mockChildProps, ...mockChildProps]
                    })}
                />
            );

            expect(
                container.getElementsByTagName('mocked-articlefeature')
            ).toHaveLength(8);
        });
    });

    describe('Tests for the case of Content Lab', () => {
        it('should return a grid of 1 items', () => {
            const fields = {
                ...customFields,
                layout: 'cajaContent1'
            };
            const children = [mockedArticleFeature];

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
            ).toHaveLength(1);
            expect(
                container.getElementsByClassName('content-lab')
            ).toHaveLength(1);
        });
    });

    describe('Tests for the case BN Grilla 6 + Timeline layout', () => {
        it('should return a warning if LN_TIMELINE feature is missing in BN Grilla 6 + Timeline layout', () => {
            const fields = {
                ...customFields,
                layout: 'bn_6_grid_timeline'
            };

            render(
                <CajaManual
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'Esta diagramación requiere el feature LN10 Timeline'
                )
            ).toBeVisible();
        });

        it('should not return a warning if LN_TIMELINE feature is present in BN Grilla 6 + Timeline layout', () => {
            const fields = {
                ...customFields,
                layout: 'bn_6_grid_timeline'
            };

            render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        childProps: [
                            ...mockChildProps,
                            { collection: 'features', type: 'LN-10/timeline' }
                        ]
                    })}
                />
            );

            expect(
                screen.queryByText(
                    'Esta diagramación requiere el feature LN10 Timeline'
                )
            ).toBeNull();
        });
    });
});
